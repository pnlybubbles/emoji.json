const SOURCE_URL = "https://unicode.org/Public/emoji/16.0/emoji-test.txt";

const res = await fetch(SOURCE_URL);
const text = await res.text();

const GROUP_PRE = "# group: ";
const SUBGROUP_PRE = "# subgroup: ";

let group = null;
let subgroup = null;
const emoji = [];

for (const line of text.split("\n")) {
  if (line.startsWith(GROUP_PRE)) group = line.slice(GROUP_PRE.length);
  if (line.startsWith(SUBGROUP_PRE)) subgroup = line.slice(SUBGROUP_PRE.length);
  if (line.startsWith("#")) continue;
  if (line === "") continue;
  const columns = line.match(
    /^(.+?)\s+;\s[\w-]+\s+#\s(?<emoji>.+?)\sE(?<version>[\d.]+)\s(?<name>.+)$/
  );
  const captured = columns?.groups;
  if (!captured) continue;
  emoji.push({ group, subgroup, ...captured });
}

await Deno.writeTextFile("emoji.json", JSON.stringify(emoji));
