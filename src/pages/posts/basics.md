---
title: 'astro basics'
pubDate: 2022-02-23
author: 'Chris'
image:
    url: '' 
    alt: ''
tags: ["astro", "blogging", "learning in public", "basics"]

---


# Astro basics

## JavaScript

### JS between in [frontmatter](https://docs.astro.build/en/core-concepts/astro-components/#the-component-script) vs [client-side](https://docs.astro.build/en/core-concepts/astro-components/#client-side-scripts)
JS in .astro frontmatter (ie between code fences ---) is run at build time.
JS in \<script> tags is sent to the browser and to run client-side (eg to add interactivity to the page).

First add JS between `---` markers at head of .astro page:

```javascript
---
const pageTitle = 'About Me';

const identity = {
  firstName: 'Chris',
  lastName: 'Cozens',
  country: 'UK',
  occupation: ['molecular biologist', 'full stack developer'],
};

const skills = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Astro', 'writing docs',
];
---
```

Then inject as for JSX:

```jsx
<h1>{pageTitle}</h1>
<ul>
      <li>My name is {identity.firstName}.</li>
      <li>
        I live in {identity.country} and I am a {
          identity.occupation[0]
        } and {identity.occupation[1]}.
      </li>
    </ul>
    <p>My skills are:</p>
    <ul>
      {skills.map((skill) => <li>{skill}</li>)}
    </ul>

    {happy && <p>I am happy to be learning Astro!</p>}

```

## [Styling](https://docs.astro.build/en/guides/styling/#styling-in-astro)
The Astro \<style> tag is scoped by default, meaning that it only affects the elements in its own file.

```html
<style>
  h1 {
    color: purple;
    font-size: 4rem;
  }
</style>
```

### Styling with JavaScript
First the style:

```html
 .skill {
    color: green;
    font-weight: bold;
	}
</style>
```

Then in the HTML:

```JSX
<ul>
  {skills.map((skill) => <li class="skill">{skill}</li>)}
</ul>
```

### [Using CSS variables](https://docs.astro.build/en/guides/styling/#css-variables)
Define colour in JS:

```javascript
const skillColour = "navy";
```

Then inject `define:vars={{skillColour}}` into style declaration the style, and update color to use the colour `color: var(--skillColor)`:

```html
<style define:vars={{skillColour}}>

 .skill {
    color: var(--skillColor);
    font-weight: bold;
	}
</style>
```

And leave the JSX:

```JSX
<ul>
  {skills.map((skill) => <li class="skill">{skill}</li>)}
</ul>
```

And the skillColour variable is now passed to the define:vars directive and the skills colour is `skillColour`.

### Global styling
This can be done various ways - tutorial uses `global.css` that is then imported to each page.  
1. Create `src/styles/global.css`  
2. Add CSS  

	
```CSS
html {
  background-color: #f1f5f9;
  font-family: sans-serif;
}
	
body {
  margin: 0 auto;
  width: 100%;
  max-width: 80ch;
  padding: 1rem;
  line-height: 1.5;
}
	
* {
  box-sizing: border-box;
}
	
h1 {
  margin: 1rem 0;
  font-size: 2.5rem;
}
```

3. Import to each page at top of frontmatter: 

```javascript
---
import '../styles/global.css';
```


# [Astro components](https://docs.astro.build/en/core-concepts/astro-components/#component-structure)
Simples!
## Navigation
1. create `/src/components/Navigation.astro';
2. populate with links

	```javascript
	---
	---
	
	<a href="/">Home</a>
	<a href="/about/">About</a>
	<a href="/blog/">Blog</a>
	```
3. in page code fences, import: `import Navigation from '../components/Navigation.astro';`
4. Instantiate in HTML: `<Navigation />`


## Footer
1. create `/src/components/Footer.astro';
2. populate with links

	```javascript
	---
	const platform = "github";
	const username = "withastro";
	---
	
	<footer>
	  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p>
	</footer>
	```
3. in page code fences, import: `import Footer from '../components/Footer.astro';`
4. Instantiate in HTML, just before closing \</body> tag: 
5. ```javascript
			<Footer />
		</body>
</html>
```

## Reusable component
### [Component props](https://docs.astro.build/en/core-concepts/astro-components/#component-props)
Make a single, reusable component and display it multiple times. Each time, you will pass it different properties (props) to use: the online platform and your username there.

1. Create a new file at the location src/components/Social.astro.

2. Copy the following code into your new file, Social.astro.

	```javascript
	---
	const { platform, username } = Astro.props;
	---
	<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
	```

3. import into Footer `import Social from './Social.astro';`
4. Use component, passing different component attributes as props each time:

```javascript
---
const platform = "github";
const username = "withastro";
import Social from './Social.astro';
---

<footer>
  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p>
  <Social platform="twitter" username="astrodotbuild" />
  <Social platform="github" username="withastro" />
  <Social platform="youtube" username="astrodotbuild" />
</footer>
```

5. Add styling in Social component

```javascript
<style>
  a {
    padding: 0.5rem 1rem;
    color: white;
    background-color: #4c1d95;
    text-decoration: none;
  }
</style>
```


## Notes on responsive styling
- Style and position the navigation links for mobile
- Include an expanded class that can be toggled to display or hide the links on mobile
- Use a @media query to define different styles for larger screen sizes

### MOBILE-FIRST DESIGN

Start by defining what should happen on small screen sizes first! Smaller screen sizes require simpler layouts. Then, adjust your styles to accommodate larger devices. If you design the complicated case first, then you have to work to try to make it simple again.

## hamburger
they said

```javascript
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});
```

I had to to do:

```javascript
const hamburger = document.querySelector('.hamburger');
  if (!hamburger) {
    throw new ReferenceError('Hamburger is not found.');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (!navLinks) {
        throw new ReferenceError(
          '.nav-links selector is not found.'
        );
      }
      if (navLinks) {
        navLinks.classList.toggle('expanded');
      }
    });
  }
```

[This](https://www.sitepoint.com/community/t/typescript-with-queryselector-issues/341361/4) was a help

Created `/src/scripts/menu.js/ with first version in.
In each page, between <Footer /> and </body>, insert:

```jsx
<script>
	import "../scripts/menu.js";
</script>
```

# [Layouts](https://docs.astro.build/en/core-concepts/layouts/)
## Create reusable layout components
1. Create in layoud dir, eg ` src/layouts/BaseLayout.astro`
2. add content
3. use on a page!
	
	```jsx
	---
	import BaseLayout from '../layouts/BaseLayout.astro';
	const pageTitle = "Home Page";
	---
	<BaseLayout>
	  <h2>My awesome blog subtitle</h2>
	</BaseLayout>
	```

## Pass content to your layouts with \[<slot />](https://docs.astro.build/en/core-concepts/astro-components/#slots)
The \<slot /> allows you to inject (or “slot in”) child content written between opening and closing \<Component> \</Component> tags to any Component.astro file.

### Pass page-specific values as props
eg in `index.astro`
	```jsx
	---
	import BaseLayout from '../layouts/BaseLayout.astro';
	const pageTitle = "Home Page";
	---
	<BaseLayout pageTitle={pageTitle}>
	  <h2>My awesome blog subtitle</h2>
	</BaseLayout>
	```
...and then modify BaseLayout.astro frontmatter to receive pageTitle as props:

```javascript
// const pageTitle = 'Home Page';
const {pageTitle} = Astro.props;
```
Now each individual page can specify its own title to the layout.

## Pass data from Markdown frontmatter to your layouts
When you include the layout frontmatter property in an .md file, all of your frontmatter YAML values are available to the layout file.

Create a new file at src/layouts/MarkdownPostLayout.astro

Copy the following code into MarkdownPostLayout.astro

```jsx
src/layouts/MarkdownPostLayout.astro
---
const { frontmatter } = Astro.props;
---
<h1>{frontmatter.title}</h1>
<p>Written by {frontmatter.author}</p>
<slot />
```


## [Nest multiple layouts]()
Nest layouts, eg to apply BaseLayout styling to MarkdownPostLayout by wrapping content of layout to nest in \<BaseLayout>:

```jsx
// MarkdownPostLayout.astro
---
import BaseLayout from './BaseLayout.astro';
const { frontmatter } = Astro.props;
---
<BaseLayout pageTitle={frontmatter.title}>
  <h1>{frontmatter.title}</h1>
  <p>{frontmatter.pubDate.slice(0,10)}</p>
  <p><em>{frontmatter.description}</em></p>
  <p>Written by: {frontmatter.author}</p>
  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
  <slot />
</BaseLayout>
```