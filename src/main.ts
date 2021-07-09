import vscode from 'vscode';

const LABEL_REGEX = /^\s*(\(\d+\)).*/
const INFIX_REGEX = /\s*(\~|\$|\+|SUB|<-)\s*/g

export function activate(context: vscode.ExtensionContext) {
	void context

	// 👍 formatter implemented using API
	vscode.languages.registerDocumentFormattingEditProvider('intercal', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const edits = [] as vscode.TextEdit[]
			for (let i = 0; i < document.lineCount; i++) {
				const line = document.lineAt(i);
				let new_line = line.text.trim().replace(/\s+/g, ' ')

				// indent lines without labels
				let match = new_line.match(LABEL_REGEX)
				if (match) {
					const label = match[1]
					new_line = new_line.replace(label, label + ' '.repeat(7 - label.length))
				} else if (new_line !== '') {
					new_line = '        ' + new_line
				}
123
				// add a space between binary ops
				new_line = new_line.replace(INFIX_REGEX, ' $1 ')

				// replace `spark-spot`s (`'.`) with `wow`s (`!`)
				new_line = new_line.replace(/'\s*\./g, '!')

				if (new_line !== line.text) {
					edits.push(vscode.TextEdit.replace(line.range, new_line))
				}
			}
			return edits
		}
	});
}
