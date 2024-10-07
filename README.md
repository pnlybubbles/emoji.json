# emoji.json

Simple JSON formatted emoji list from Unicode specification.

Source: https://unicode.org/Public/emoji/16.0/emoji-test.txt

# Data

https://raw.githubusercontent.com/pnlybubbles/emoji.json/refs/tags/v16.0/emoji.json

# Format

emoji-test.txt

```
# group: Smileys & Emotion

# subgroup: face-smiling
1F600                                                  ; fully-qualified     # 😀 E1.0 grinning face
```

to be json:

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
]
```

- The order is same as unicode specification
- The name includes `:` will conventionally be a variation
  - "👋🏻" (`waving hand: light skin tone`) is variation of "👋" (`waving hand`)
