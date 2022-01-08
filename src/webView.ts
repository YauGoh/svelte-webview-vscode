import * as vscode from 'vscode';

export class WebView implements vscode.Disposable {
    private panel:vscode.WebviewPanel;

    constructor(protected context: vscode.ExtensionContext, private viewType: string, title: string) {
        this.panel = this.createPanel(title);

        this.updatePanel();
    }

    dispose() {
        this.panel.dispose();
    }

    show()
    {
        this.panel.reveal();
    }

    protected getHtmlContent(): string {
        return `
        <html>
            <body>
                This is something interesting!!!
            </body>
        </html>`;
    }
    
    private createPanel(title: string): vscode.WebviewPanel {
        const column = vscode.window.activeTextEditor && vscode.window.activeTextEditor.viewColumn
        ? vscode.window.activeTextEditor?.viewColumn
        : vscode.ViewColumn.Active;

        return vscode.window.createWebviewPanel(
            this.viewType,
            title,
            column,
            this.getWebViewOptions()
        );
    }

    private getWebViewOptions(): (vscode.WebviewPanelOptions & vscode.WebviewOptions) {
        return {
            // Enable javascript in the webview
            enableScripts: true,

            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')]
	    };
    }

    private updatePanel() {
        this.panel.webview.html = this.getHtmlContent();
    }
}