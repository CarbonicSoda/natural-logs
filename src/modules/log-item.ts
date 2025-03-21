import { ConsoleMethod } from "../types/types";

export class LogItem {
	//MO DOC flag, if args.length < 2 so I don't have to show it in array
	#orphan: boolean;

	constructor(
		public method: ConsoleMethod,
		public time: string,
		public args: any[] | any,
	) {
		this.#orphan = this.args.length < 2;
		if (this.#orphan) this.args = this.args[0];
	}

	//MO DOC ignore #orphan and return the original args array
	get argsArray(): any[] {
		return this.#orphan ? [this.args] : this.args;
	}

	//MO DOC stringify for popup content
	toString(details: { index?: number; sep: "newline" | "space" }): string {
		const strArgs = this.argsArray.map((arg) => {
			if (typeof arg !== "object") return `${arg}`;
			try {
				return JSON.stringify(arg, null, " ");
			} catch {
				return details.index
					? `[Circular], refer to natlog.history[${details.index}].`
					: "[Circular], refer to debug console or enable history.";
			}
		});
		const sep = details.sep === "newline" ? "<br>" : " ";
		return strArgs.join(sep);
	}
}
