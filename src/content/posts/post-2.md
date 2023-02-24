---
title: 'Second post: snippets'
pubDate: 2023-02-20
author: 'Chris'
image:
    url: '' 
    alt: ''
tags: ["astro", "blogging", "learning in public", "snippets"]

---
# This is generated from a snippet!

Thanks to [ceciliacreates](https://dev.to/ceceliacreates/use-vs-code-snippets-to-generate-markdown-front-matter-fpc#:~:text=To%20open%20the%20snippets%20menu,the%20values%20for%20your%20file) and for recommending the excellent [snippet generator](https://snippet-generator.app/).

The astro tutorial asked me to put some new posts in and I can immediately see I'm going to get bored of writing the frontmatter for these, so snippet time! Snippet generator wrote the following for me:

```json
"post": {
  "prefix": "",
  "body": [
    "---",
    "title: '$1'",
    "pubDate: $2",
    "author: '$3'",
    "image:",
    "    url: '$4' ",
    "    alt: '$5'",
    "tags: [\"astro\", \"blogging\", \"learning in public\", $6]",
    "",
    "---",
    "# $7"
  ],
  "description": "post"
}
```

Which I've parked in my user snippets (a local file for this dir for now), and can happily access via <kbd>⌃ Control</kbd> + <kbd>⇧ Shift</kbd> + <kbd>S</kbd> .
While I'm collecting widgets, those keyboard icons are from [kbd Generator](https://kbd.hsuan.xyz/).