/* --------------------------------------------------------------------------------------------
 * Copyright (c) Chris Hansen. All rights reserved.
 * Licensed under the MIT License. See License.md in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { spawnSync }  from 'child_process';
const https = require('https');
import { commands, window, workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

async function checkVersion(ver_str: string) {
	function checkVersionLocal(rec_ver_str: string = "1.7.2") {
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
			window.showWarningMessage(`fortran-ls: A newer version (${rec_ver_str}) of "fortls" is available.`);
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

export async function activate(context: ExtensionContext) {

	// Get path for the language server
	const conf = workspace.getConfiguration('fortran-ls', null);
	const executablePath = conf.get<string>('executablePath') || 'fortls';

	// Setup server arguments
	let args_server = [];
	if (!conf.get<boolean>('includeSymbolMem')) { args_server.push("--symbol_skip_mem") }
	if (conf.get<boolean>('incrementalSync')) { args_server.push("--incrmental_sync") }
	if (!conf.get<boolean>('autocompletePrefix')) { args_server.push("--autocomplete_no_prefix") }
	if (conf.get<boolean>('lowercaseIntrinsics')) { args_server.push("--lowercase_intrinsics") }
	if (conf.get<boolean>('useSignatureHelp')) { args_server.push("--use_signature_help") }
	if (conf.get<boolean>('variableHover')) { args_server.push("--variable_hover") }
	if (conf.get<boolean>('notifyInit')) { args_server.push("--notify_init") }
	if (conf.get<boolean>('enableCodeActions')) { args_server.push("--enable_code_actions") }

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
			// Register the server for plain text documents
			documentSelector: [
				{scheme: 'file', language: 'fortran'},
				{scheme: 'file', language: 'fortran_fixed-form'},
				{scheme: 'file', language: 'FortranFreeForm'}
			],
			synchronize: {
				// Notify the server about file changes to fortran files contain in the workspace
				fileEvents: workspace.createFileSystemWatcher('**/*.{f,F,f77,F77,f90,F90,f95,F95,f03,F03,f08,F08,for,FOR,fpp,FPP}')
			}
		}

		// Create the language client and start the client.
		let disposable = new LanguageClient('fortls', 'FORTRAN Language Server', serverOptions, clientOptions).start();

		// Push the disposable to the context's subscriptions so that the
		// client can be deactivated on extension deactivation
		context.subscriptions.push(disposable);
	}
}
