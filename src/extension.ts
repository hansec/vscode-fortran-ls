/* --------------------------------------------------------------------------------------------
 * Copyright (c) Chris Hansen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { spawn }  from 'child_process';
import { commands, window, workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export async function activate(context: ExtensionContext) {

	// Get path for the language server
	const conf = workspace.getConfiguration('fortran-ls', null);
	const executablePath = conf.get<string>('executablePath') || 'fortls';

	// Check path (if fortls is available and version is ^0.3.6)
	let args_check = ["--version"];
	const childProcess = spawn(executablePath, args_check);
	// Check version
	if (conf.get<boolean>('displayVerWarning')) {
		childProcess.stdout.on('data', (data) => {
			let ver_str = data.toString().trim();
			let ver_split = ver_str.split(".");
			const rec_ver_str = "0.5.0";
			let rec_ver = rec_ver_str.split(".");
			for (var index = 0; index < rec_ver.length; ++index) {
				if (parseInt(ver_split[index]) < parseInt(rec_ver[index])) {
					window.showWarningMessage(`fortran-ls: Installed version (${ver_str}) of "fortls" is lower than the recommended version (${rec_ver_str}).`);
					break
				} else if (parseInt(ver_split[index]) > parseInt(rec_ver[index])) {
					break
				}
			}
		});
	}
	childProcess.on("error", () => {
		const selected = window.showErrorMessage("Error spawning fortls: This can occur if you do not have the fortran-language-server installed or if it is not in your path.", 'Open settings');
		selected.then( () =>
			commands.executeCommand('workbench.action.openGlobalSettings')
		)
	});

	//
	let args_server = [];
	if (!conf.get<boolean>('includeSymbolMem')) { args_server.push("--symbol_skip_mem") }
	if (conf.get<boolean>('incrementalSync')) { args_server.push("--incrmental_sync") }
	if (!conf.get<boolean>('autocompletePrefix')) { args_server.push("--autocomplete_no_prefix") }
	if (conf.get<boolean>('lowercaseIntrinsics')) { args_server.push("--lowercase_intrinsics") }

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
			{scheme: 'file', language: 'fortran-modern'}
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
