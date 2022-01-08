import * as vscode from 'vscode';
import { WebView } from './webView';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "svelte-webview" is now active!');

	let disposable = vscode.commands.registerCommand('svelte-webview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from svelte-webview!');

		const webView = new WebView(context, "WebView", "Hello Word");

		webView.show();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}