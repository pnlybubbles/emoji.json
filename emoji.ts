const SOURCE_URL = 'https://unicode.org/Public/emoji/16.0/emoji-test.txt'

const res = await fetch(SOURCE_URL)
const text = await res.text()

const GROUP_PRE = '# group: '
const SUBGROUP_PRE = '# subgroup: '

type Status = 'component' | 'fully-qualified' | 'minimally-qualified' | 'unqualified'
type Groups = { codes: string, status: Status, emoji: string, version: string, name: string }

type Emoji = {
  group: string
  subgroup: string
  emoji: string
  version: string
  name: string
  variants?: { emoji: string, name: string }[]
}

type EmojiFull = Omit<Emoji, 'variants'> & {
  codes: string
  status: Status
}

const emoji: Emoji[] = []
const emojiFull: EmojiFull[] = []

let group = ''
let subgroup = ''

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

  const nameComponents = captured.name.match(/^(?<prefix>.+?)(:\s(?<variation>.+))?$/)?.groups as { prefix: string, variation?: string } | undefined
  if (!nameComponents) continue

  const variants = nameComponents.variation?.split(', ') ?? []
  const skinTonevariants = variants.filter(v => v.endsWith('skin tone'))
  const nonSkinTonevariants = variants.filter(v => !v.endsWith('skin tone') && v !== 'person')
  const name = nameComponents.prefix + (nonSkinTonevariants.length > 0 ? `: ${nonSkinTonevariants.join(', ')}` : '')

  const { status, codes: _, ...rest } = captured

  if (status !== 'fully-qualified') continue

  const last = emoji[emoji.length - 1]

  if (last && last.name === name && skinTonevariants.length > 0) {
    last.variants ??= []
    last.variants.push({ emoji: captured.emoji, name: skinTonevariants.join(', ') })
  } else {
    emoji.push({ group, subgroup, ...rest })
  }
}

await Deno.writeTextFile('emoji.json', JSON.stringify(emoji))
await Deno.writeTextFile('emoji.full.json', JSON.stringify(emojiFull))
