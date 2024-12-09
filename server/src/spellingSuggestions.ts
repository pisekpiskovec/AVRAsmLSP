import { spawnSync } from "child_process";
import { encode } from "punycode";
import log from "./log";

export const spellingSuggestions = (
  content: string
): Record<string, string[]> => {
  const invalidWordsAndSuggestions:Record<string, string[]> = {};

  const allOutput = spawnSync("aspell", ["pipe"], {
    input: content,
    encoding: "utf-8"
  }).stdout.trim().split("\n");

  log.write({allOutput});

  allOutput.forEach((line) => {
    const prefix = line.slice(0, 1);

    switch(prefix){
      case "&":
        const suggestionMatch = line.match(/^& (.*?) \d.*: (.*)$/);

        if(!suggestionMatch) {
          log.write({spellingSuggestions: {invalidMatch: line}});
          return;
        }

        invalidWordsAndSuggestions[suggestionMatch[1]] = suggestionMatch[2].split(", ");
        break;
      case "#":
        const match = line.match(/^# (.*?) \d/);

        if(!match) {
          log.write({spellingSuggestions: {invalidMatch: line}});
          return;
        }

        invalidWordsAndSuggestions[match[1]] = [];
        break;
    }
  });

  return invalidWordsAndSuggestions;
};
