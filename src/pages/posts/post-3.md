---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Conditional rendering'
pubDate: 2023-02-20
author: 'Chris'
image:
    url: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Lqct1Jv_--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/z4wpfeaivv0kp063b45l.png' 
    alt: 'Javascript logical operators: logical OR and logical AND'
tags: ["astro", "blogging", "learning in public", ]

---
# Conditionally render elements

I thought (this)[https://docs.astro.build/en/tutorial/2-pages/3/#conditionally-render-elements] was so neat I've kept a note.

First, in JS frontmatter, add variables:

```javascript
const happy = true;
const finished = false;
const goal = 3;
```

Then, in HTML section, inject JS and conditionally render:

```javascript
{happy && <p>I am happy to be learning Astro!</p>}

{finished && <p>I finished this tutorial!</p>}

{goal === 3 ? <p>My goal is to finish in 3 days.</p> : <p>My goal is not 3 days.</p>}
```