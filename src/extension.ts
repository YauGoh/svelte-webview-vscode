import * as vscode from 'vscode';
import { WebView } from './webView';
import { WebviewViewProvider } from './webviewViewProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "svelte-webview" is now active!');

	const explorer = new WebviewViewProvider(context, "sample");

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("svelte-webview.explorer", explorer)
	)

	let disposable = vscode.commands.registerCommand('svelte-webview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from svelte-webview!');
		explorer.show();

		const webView = new WebView(context, "sample", "Sample");
		webView.show();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}