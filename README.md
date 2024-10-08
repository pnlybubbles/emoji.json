# emoji.json

Simple JSON formatted emoji list from Unicode specification.

Useful for emoji pickers.

Single json, no dependencies.

# Data

https://raw.githubusercontent.com/pnlybubbles/emoji.json/refs/tags/v16.0/emoji.json

# Format

emoji-test.txt (https://unicode.org/Public/emoji/16.0/emoji-test.txt)

```
# group: Smileys & Emotion

# subgroup: face-smiling
1F600                                                  ; fully-qualified     # 😀 E1.0 grinning face

...

# group: People & Body

# subgroup: hand-fingers-open
1F44B                                                  ; fully-qualified     # 👋 E0.6 waving hand
1F44B 1F3FB                                            ; fully-qualified     # 👋🏻 E1.0 waving hand: light skin tone
1F44B 1F3FC                                            ; fully-qualified     # 👋🏼 E1.0 waving hand: medium-light skin tone
1F44B 1F3FD                                            ; fully-qualified     # 👋🏽 E1.0 waving hand: medium skin tone
1F44B 1F3FE                                            ; fully-qualified     # 👋🏾 E1.0 waving hand: medium-dark skin tone
1F44B 1F3FF                                            ; fully-qualified     # 👋🏿 E1.0 waving hand: dark skin tone

...
```

emoji.json

```json
[
  {
    "group": "Smileys & Emotion",
    "subgroup": "face-smiling",
    "emoji": "😀",
    "version": "1.0",
    "name": "grinning face"
  },

  ...

  {
    "group": "People & Body",
    "subgroup": "hand-fingers-open",
    "emoji": "👋",
    "version": "0.6",
    "name": "waving hand",
    "variants": [
      { "emoji": "👋🏻", "name": "light skin tone" },
      { "emoji": "👋🏼", "name": "medium-light skin tone" },
      { "emoji": "👋🏽", "name": "medium skin tone" },
      { "emoji": "👋🏾", "name": "medium-dark skin tone" },
      { "emoji": "👋🏿", "name": "dark skin tone" }
    ]
  },

  ...
]
```

-
- Includes only `fully-qualified` emoji
  - Excluded unqualified emoji "☺" `U+263A` ("☺️" `U+263A U+FE0F` is included)
  - Excluded emoji component "🦱"
- The order is same as the specification
- Skin tone variants are grouped into the original emoji without modifiers
  - "👋🏻" (`waving hand: light skin tone`) is a variant of "👋" (`waving hand`)

# Advanced

`emoji.full.json` includes all specification.

- No variants, all flatten.
- Includes status: `fully-qualified`, `unqualified`, `minimally-qualified`,
  `component`
- Includes raw Unicode sequance.

Additional properties:

```json
{
  ...
  "status": "fully-qualified",
  "codes": "1F600"
}
```
