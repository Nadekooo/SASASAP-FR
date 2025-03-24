const {readFileSync, writeFileSync, readdirSync} = require("node:fs");
const {basename} = require("node:path")

const localeNames = {
    en: "English",
    fr: "French",
    jp: "Japanese",
};

const folder = readdirSync("l10n");
const translations = folder.map(e => basename(e, ".json"));

const flat = {
    msg: {},
    cmd: {},
    terms: {},
    custom: {},
};

const insertLine = (type, localeName, lineSrc, lineTarget) => {
    if (!flat[type][lineSrc]) {
        flat[type][lineSrc] = {};
    }

    flat[type][lineSrc][localeName] = lineTarget;
}

for (const locale of translations) {
    const translated = JSON.parse(String(readFileSync(`l10n/${locale}.json`)));
    const localeName = localeNames[locale];

    for (const type of ["msg", "cmd", "terms", "custom"]) {
        for (const lineSrc in translated[type]) {
            const lineTarget = translated[type][lineSrc].replaceAll('<br>', '<line break>');

            insertLine(type, localeName, lineSrc, lineTarget);
        }
    }
}

writeFileSync('Translations-target.json', JSON.stringify(flat, undefined, 2));
