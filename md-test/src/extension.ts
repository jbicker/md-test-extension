import * as vscode from 'vscode';

class MarkdownSignatureHelpProvider implements vscode.SignatureHelpProvider {
	provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.SignatureHelpContext): vscode.ProviderResult<vscode.SignatureHelp> {
		vscode.window.showInformationMessage('SignatureHelp provided');

		const p1 = new vscode.ParameterInformation('param1', 'this is the first parameter');
		const p2 = new vscode.ParameterInformation('param2', 'this is the second parameter');
		const p3 = new vscode.ParameterInformation('param3', 'this is the third parameter');
		const p4 = new vscode.ParameterInformation('param4', 'this is the fourth parameter');

		const si1 = new vscode.SignatureInformation('Signature1: param1, param2', 'First Signature: no activeParameter set');
		si1.parameters = [p1, p2];
		const si2 = new vscode.SignatureInformation('Signature2: param1, param2, param3', 'Second Signature: here the 2nd parameter is directly set as activeParameter');
		si2.parameters = [p1, p2, p3];
		si2.activeParameter = 1;
		const si3 = new vscode.SignatureInformation('Signature3: param1, param2, param3, param4', 'Third Signature: may the force be set as activeParameter');
		si3.parameters = [p1, p2, p3, p4];
		si3.activeParameter = 3;

		const sh = new vscode.SignatureHelp();
		sh.signatures = [si1, si2, si3];
		sh.activeSignature = 0;
		sh.activeParameter = 0;

		return sh;
	}

}

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('markdown', new MarkdownSignatureHelpProvider(), '#'));
}
