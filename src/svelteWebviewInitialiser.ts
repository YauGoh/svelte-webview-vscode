import * as vscode from 'vscode';

export class SvelteWebviewInitialiser {
    constructor(private context: vscode.ExtensionContext) {}

    initialize(
        view: string,
        webView: vscode.Webview): void {

        webView.options = this.getWebViewOptions(this.context, view);
        webView.html = this.getHtmlContent(this.context, view);
    }

    protected getHtmlContent(context: vscode.ExtensionContext, view: string): string {

        const nonce = this.getNonce();

        const scriptUri = this.getSvelteAppDistributionIndexJsUri(context, view)

        return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>
    </head>

    <body>
    </body>
    <script nonce="${nonce}" src="${scriptUri}"></script>
</html>
`;
    }

    private getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    private getWebViewOptions(context: vscode.ExtensionContext, view: string): (vscode.WebviewPanelOptions & vscode.WebviewOptions) {
        return {
            enableScripts: true,
            localResourceRoots: [
                this.getSvelteAppDistributionFolderUri(context, view)
            ]
	    };
    }

    private getSvelteAppDistributionFolderUri(context: vscode.ExtensionContext, view: string): vscode.Uri {
        return vscode.Uri.joinPath(context.extensionUri, 'svelte', 'dist', 'views', view);
    }

    private getSvelteAppDistributionIndexJsUri(context: vscode.ExtensionContext, view: string): vscode.Uri {
        return  vscode.Uri
            .joinPath(context.extensionUri, 'svelte', 'dist', 'views', view, 'index.js')
            .with({ 'scheme': 'vscode-resource' });
    }
}