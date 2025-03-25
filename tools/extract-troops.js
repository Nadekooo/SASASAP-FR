const { readFileSync } = require("node:fs");

const troops = JSON.parse(String(readFileSync(process.argv[2])));

const lines = {};

const addLine = (line) => lines[line] = line;

for (const troop of troops) {
	if (!troop) {
		continue;
	}

	for (const page of troop.pages) {
		for (const cmd of page.list) {
			if (cmd.code === 401) {
				addLine(cmd.parameters[0]);
			} else if (cmd.code === 402) {
				addLine(cmd.parameters[1]);
			}
		}
	}
}

console.log(JSON.stringify(lines, undefined, 4));
