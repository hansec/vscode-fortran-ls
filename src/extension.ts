/* --------------------------------------------------------------------------------------------
 * Copyright (c) Chris Hansen. All rights reserved.
 * Licensed under the MIT License. See License.md in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { spawnSync }  from 'child_process';
const https = require('https');
import { commands, extensions, window, workspace, WorkspaceFolder, Uri, TextDocument } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

let clients: Map<string, LanguageClient> = new Map();

let _sortedWorkspaceFolders: string[] | undefined;
function sortedWorkspaceFolders(): string[] {
	if (_sortedWorkspaceFolders === void 0) {
		_sortedWorkspaceFolders = workspace.workspaceFolders ? workspace.workspaceFolders.map(folder => {
			let result = folder.uri.toString();
			if (result.charAt(result.length - 1) !== '/') {
				result = result + '/';
			}
			return result;
		}).sort(
			(a, b) => {
				return a.length - b.length;
			}
		) : [];
	}
	return _sortedWorkspaceFolders;
}
workspace.onDidChangeWorkspaceFolders(() => _sortedWorkspaceFolders = undefined);

function getOuterMostWorkspaceFolder(folder: WorkspaceFolder): WorkspaceFolder {
	let sorted = sortedWorkspaceFolders();
	for (let element of sorted) {
		let uri = folder.uri.toString();
		if (uri.charAt(uri.length - 1) !== '/') {
			uri = uri + '/';
		}
		if (uri.startsWith(element)) {
			return workspace.getWorkspaceFolder(Uri.parse(element))!;
		}
	}
	return folder;
}

async function checkVersion(ver_str: string) {
	function checkVersionLocal(rec_ver_str: string = "1.11.0") {
		function compareSymantic(ver: string[], rec_ver: string[]) {
			for (var index = 0; index < rec_ver.length; ++index) {
			  if (parseInt(ver[index]) < parseInt(rec_ver[index])) {
				return true;
			  } else if (parseInt(ver[index]) > parseInt(rec_ver[index])) {
				return false;
			  }
			}
			return false;
		}
		if (compareSymantic(ver_str.split("."), rec_ver_str.split("."))) {
			window.showWarningMessage(`Fortran-ls: A newer version (${rec_ver_str}) of "fortls" is available.`);
			return false;
		}
		return true;
	}
	https.get('https://pypi.org/pypi/fortran-language-server/json', (resp: any) => {
		let data = '';
		// A chunk of data has been recieved
		resp.on('data', (chunk: string) => { data += chunk; } );
		// The whole response has been received, check version
		resp.on('end', () => {
			try {
				let package_data = JSON.parse(data);
				checkVersionLocal(package_data.info.version);
			} catch (e) {
				checkVersionLocal();
			}
		});
	}).on("error", () => { checkVersionLocal(); } );
}

function getLSVersion(executablePath: string, launchArgs: string[]) {
	const results = spawnSync(executablePath, launchArgs.concat(["--version"]));
	if (results.error) {
		const selected = window.showErrorMessage("Error spawning fortls: Please check that fortran-language-server is installed and in your path.", 'Open settings');
		selected.then( () =>
			commands.executeCommand('workbench.action.openGlobalSettings')
		)
		return null;
	}
	if (results.status !== 0) {
		const selected = window.showErrorMessage("Error launching fortls: Please check that all selected options are supported by your language server version.", 'Open settings');
		selected.then( () =>
			commands.executeCommand('workbench.action.openGlobalSettings')
		)
		return null;
	}
	return results.stdout.toString().trim();
}

export async function activate() {

	function didOpenTextDocument(document: TextDocument): void {
		// We are only interested in Fortran files
		if (!document.languageId.toLowerCase().startsWith('fortran')) {
			return;
		}
		let uri = document.uri;
		let folder = workspace.getWorkspaceFolder(uri);
		// Files outside a folder can't be handled. This might depend on the language.
		// Single file languages like JSON might handle files outside the workspace folders.
		if (!folder) {
			return;
		}
		// If we have nested workspace folders we only start a server on the outer most workspace folder.
		folder = getOuterMostWorkspaceFolder(folder);
		if (clients.has(folder.uri.toString())) {
			return;
		}

		// Check which base language extension is being used
		let haveMFortran = false;
		let modernFortran = extensions.getExtension('krvajalm.linter-gfortran');
		if (modernFortran) {
			haveMFortran = modernFortran.isActive;
		}

		// Get path for the language server
		const conf = workspace.getConfiguration('fortran-ls', null);
		const executablePath = conf.get<string>('executablePath') || 'fortls';
		const maxLineLength = conf.get<number>('maxLineLength') || -1;
		const maxCommentLineLength = conf.get<number>('maxCommentLineLength') || -1;

		// Setup server arguments
		let args_server = [];
		if (!conf.get<boolean>('includeSymbolMem')) { args_server.push("--symbol_skip_mem") }
		if (conf.get<boolean>('incrementalSync')) { args_server.push("--incrmental_sync") }
		if (!conf.get<boolean>('autocompletePrefix')) { args_server.push("--autocomplete_no_prefix") }
		if (conf.get<boolean>('lowercaseIntrinsics')) { args_server.push("--lowercase_intrinsics") }
		if (conf.get<boolean>('useSignatureHelp')) { args_server.push("--use_signature_help") }
		if (conf.get<boolean>('variableHover')) { args_server.push("--variable_hover") }
		if (conf.get<boolean>('hoverSignature')) { args_server.push("--hover_signature") }
		if (conf.get<boolean>('notifyInit')) { args_server.push("--notify_init") }
		if (conf.get<boolean>('enableCodeActions')) { args_server.push("--enable_code_actions") }
		if (maxLineLength > 0) { args_server.push(`--max_line_length=${maxLineLength}`) }
		if (maxCommentLineLength > 0) { args_server.push(`--max_comment_line_length=${maxCommentLineLength}`) }
		if (!haveMFortran) { args_server.push(`--hover_language=fortran`) }

		// Detect language server version and verify selected options
		let localLSVersion = getLSVersion(executablePath, args_server);
		if (localLSVersion) {
			// Check version if desired
			if (conf.get<boolean>('displayVerWarning')) { checkVersion(localLSVersion) }

			// If the extension is launched in debug mode then the debug server options are used
			// Otherwise the run options are used
			let serverOptions: ServerOptions = {
				command: executablePath,
				args: args_server
			}

			// Options to control the language client
			let clientOptions: LanguageClientOptions = {
				// Register the server for Fortran documents
				documentSelector: [
					{scheme: 'file', language: 'fortran', pattern: `${folder.uri.fsPath}/**/*`},
					{scheme: 'file', language: 'fortran-modern', pattern: `${folder.uri.fsPath}/**/*`},
					{scheme: 'file', language: 'fortran_fixed-form', pattern: `${folder.uri.fsPath}/**/*`},
					{scheme: 'file', language: 'FortranFreeForm', pattern: `${folder.uri.fsPath}/**/*`}
				],
				workspaceFolder: folder
				// synchronize: {
				// 	// Notify the server about file changes to Fortran files contain in the workspace
				// 	fileEvents: workspace.createFileSystemWatcher(`${folder.uri.fsPath}/**/*.{f,F,f77,F77,f90,F90,f95,F95,f03,F03,f08,F08,for,FOR,fpp,FPP}`)
				// }
			}

			// Create the language client, start the client and add it to the registry
			let client = new LanguageClient('fortls', 'Fortran Language Server', serverOptions, clientOptions);
			client.start();
			clients.set(folder.uri.toString(), client);
		}
	}

	workspace.onDidOpenTextDocument(didOpenTextDocument);
	workspace.textDocuments.forEach(didOpenTextDocument);
	workspace.onDidChangeWorkspaceFolders((event) => {
		for (let folder of event.removed) {
			let client = clients.get(folder.uri.toString());
			if (client) {
				clients.delete(folder.uri.toString());
				client.stop();
			}
		}
	});
}

export function deactivate(): Thenable<void> {
	let promises: Thenable<void>[] = [];
	for (let client of clients.values()) {
		promises.push(client.stop());
	}
	return Promise.all(promises).then(() => undefined);
}
