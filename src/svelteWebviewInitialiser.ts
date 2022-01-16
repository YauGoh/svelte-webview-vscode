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
        const stylesUri = this.getStylesUri(context);

        return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>
        <link href="${stylesUri}" rel="stylesheet" />
    </head>

    <body>
    </body>
    <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
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
                this.getSvelteAppDistributionFolderUri(context),
                this.getSvelteAppDistributionViewFolderUri(context, view)
            ]
	    };
    }

    private getSvelteAppDistributionFolderUri(context: vscode.ExtensionContext): vscode.Uri {
        return vscode.Uri.joinPath(context.extensionUri, 'svelte', 'dist');
    }

    private getSvelteAppDistributionViewFolderUri(context: vscode.ExtensionContext, view: string): vscode.Uri {
        return vscode.Uri.joinPath(context.extensionUri, 'svelte', 'dist', 'views', view);
    }

    private getSvelteAppDistributionIndexJsUri(context: vscode.ExtensionContext, view: string): vscode.Uri {
        return  vscode.Uri
            .joinPath(context.extensionUri, 'svelte', 'dist', 'views', view, 'index.js')
            .with({ 'scheme': 'vscode-resource' });
    }

    getStylesUri(context: vscode.ExtensionContext) {
        return  vscode.Uri
        .joinPath(context.extensionUri, 'svelte', 'dist', 'styles.css')
    }
}