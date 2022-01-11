import * as vscode from 'vscode';
import { SvelteWebviewInitialiser } from './svelteWebviewInitialiser';

export class WebviewViewProvider implements vscode.WebviewViewProvider
{
    private webviewView?: vscode.WebviewView;
    private svelteWebviewInitialiser: SvelteWebviewInitialiser;

    constructor(context: vscode.ExtensionContext, private view: string) {
        this.svelteWebviewInitialiser = new SvelteWebviewInitialiser(context);
    }

    resolveWebviewView (
        webviewView: vscode.WebviewView, 
        context: vscode.WebviewViewResolveContext<unknown>, 
        token: vscode.CancellationToken): void | Thenable<void> {
        
        this.webviewView = webviewView;

        this.svelteWebviewInitialiser.initialize(this.view, this.webviewView.webview);
    }

    public show() {
        this.webviewView?.show(true);
    }
}