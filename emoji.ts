const SOURCE_URL = 'https://unicode.org/Public/emoji/16.0/emoji-test.txt'

const res = await fetch(SOURCE_URL)
const text = await res.text()

const GROUP_PRE = '# group: '
const SUBGROUP_PRE = '# subgroup: '

let group = null
let subgroup = null
const emoji = []
const emojiFull = []

type Status = 'component' | 'fully-qualified' | 'minimally-qualified' | 'unqualified'
type Groups = { codes: string, status: Status, emoji: string, version: string, name: string }

for (const line of text.split('\n')) {
  if (line.startsWith(GROUP_PRE)) group = line.slice(GROUP_PRE.length)
  if (line.startsWith(SUBGROUP_PRE)) subgroup = line.slice(SUBGROUP_PRE.length)
  if (line.startsWith('#')) continue
  if (line === '') continue
  const columns = line.match(
    /^(?<codes>.+?)\s+;\s(?<status>[\w-]+)\s+#\s(?<emoji>.+?)\sE(?<version>[\d.]+)\s(?<name>.+)$/,
  )
  const captured = columns?.groups as Groups | undefined
  if (!captured) continue
  emojiFull.push({ group, subgroup, ...captured })
  const { status, codes: _, ...rest } = captured
  if (status !== 'fully-qualified') continue
  emoji.push({ group, subgroup, ...rest })
}

await Deno.writeTextFile('emoji.json', JSON.stringify(emoji))
await Deno.writeTextFile('emoji.full.json', JSON.stringify(emojiFull))
