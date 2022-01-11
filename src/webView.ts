import * as vscode from 'vscode';
import { SvelteWebviewInitialiser } from './svelteWebviewInitialiser';

export class WebView implements vscode.Disposable {
    private panel:vscode.WebviewPanel;
    private svelteWebviewInitializer: SvelteWebviewInitialiser;

    constructor(protected context: vscode.ExtensionContext, private view: string, title: string) {
        
        this.svelteWebviewInitializer = new SvelteWebviewInitialiser(context);

        this.panel = this.createPanel(title);

        this.svelteWebviewInitializer.initialize(this.view, this.panel.webview);
    }

    dispose() {
        this.panel.dispose();
    }

    show()
    {
        this.panel.reveal();
    }

    setTitle(title: string) {
        this.panel.title = title;
    }
    
    private createPanel(title: string): vscode.WebviewPanel {
        const column = vscode.window.activeTextEditor && vscode.window.activeTextEditor.viewColumn
        ? vscode.window.activeTextEditor?.viewColumn
        : vscode.ViewColumn.Active;

        return vscode.window.createWebviewPanel(
            this.view,
            title,
            column
        );
    }
}