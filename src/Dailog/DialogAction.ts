export default class DialogAction {
	className: string;
	text: string;

	constructor(text: string, className: string = "") {
		this.text = text;
		this.className = className;
	}
}
