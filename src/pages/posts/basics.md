---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'astro basics'
pubDate: 2022-02-23
author: 'Chris'
image:
    url: '' 
    alt: ''
tags: ["astro", "blogging", "learning in public", "basics"]

---


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
	```javascript
	<Footer />
		</body>
	</Footer>
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

## Pass content to your layouts with [\<slot />](https://docs.astro.build/en/core-concepts/astro-components/#slots)
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


# Astro API

## KTA
If you need information to construct the page routes, write it inside getStaticPaths().

To receive information in the HTML template of a page route, write it outside getStaticPaths().

## Index page using [Astro.glob()](https://docs.astro.build/en/reference/api-reference/#astroglob)
Astro.glob() to access data from files in your project

1. Add `const allPosts = await Astro.glob('../pages/posts/*.md');` to blog.astro frontmatter to return information about all Mardown files
2. Dynamically render list of markdown files by calling .map() between \<ul> tags: 

```jsx
<ul>
	{allPosts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}`
</ul>
```

3. Ditch that and do it with a BlogPost component!
	1. create src/components/BlogPost.astro
	2. allow component to receive url and title as Astro.props:
`const { url, title } = Astro.props;` (in frontmatter)
	3. define element to return in main body `<li><a class="blogpost" {url}>{title}</a></li>`
	4. import into blog.astro `import BlogPost from "../components/BlogPost.astro";`
	5. Instantiate in main blog.astro component and pass in url and title: `{allPosts.map((post) => <BlogPost url={post.url} title={post.frontmatter.title} />)}`


## create pages dynamically using [getStaticPaths()](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
getStaticPaths() to create multiple pages (routes) at once
- Create a page to generate multiple pages
- Specify which page routes to build, and pass each page its own props

1. Create a new file at src/pages/tags/[tag].astro
2. The getStaticPaths function returns an array of page routes, and all of the pages at those routes will use the same template defined in the file. So, paste:
	
	```jsx
	---
	import BaseLayout from '../../layouts/BaseLayout.astro';
	
	export async function getStaticPaths() {
	  return [
	    { params: { tag: "astro" } },
	    { params: { tag: "successes" } },
	    { params: { tag: "community" } },
	    { params: { tag: "blogging" } },
	    { params: { tag: "setbacks" } },
	    { params: { tag: "learning in public" } },
	  ];
	}
	
	const { tag } = Astro.params;
	---
	<BaseLayout pageTitle={tag}>
	  <p>Posts tagged with {tag}</p>
	</BaseLayout>
	```
This creates the empty pages for tags
3. add props to the dynamic routes to make data from all blog posts available to ech route, and then make those props available to component template outsude the function.
	
	```jsx
	export async function getStaticPaths() {
	  const allPosts = await Astro.glob('../posts/*.md');
	
	  return [
	    {params: {tag: "astro"}, props: {posts: allPosts}},
	    {params: {tag: "successes"}, props: {posts: allPosts}},
	    {params: {tag: "community"}, props: {posts: allPosts}},
	    {params: {tag: "blogging"}, props: {posts: allPosts}},
	    {params: {tag: "setbacks"}, props: {posts: allPosts}},
	    {params: {tag: "learning in public"}, props: {posts: allPosts}}
	  ]
	}
	
	const { tag } = Astro.params;
	const { posts } = Astro.props;
	```

4. Filter your list of posts to only include posts that contain the page’s own tag: `const filteredPosts = posts.filter((post) => post.frontmatter.tags.includes(tag));`
5. Update HTML template in `[tag].astro` to render filtered posts only:
	
	```jsx
	<BaseLayout pageTitle={tag}>   
	  <p>Posts tagged with {tag}</p>
	  <ul>
	    {filteredPosts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
	  </ul>
	</BaseLayout>
	```
	Or refactor to use BlogPost component:

	```jsx
		<BaseLayout pageTitle={tag}>
	  <p>Posts tagged with {tag}</p>
	  <ul>
	    {filteredPosts.map(post => <BlogPost url={post.url} title={post.frontmatter.title}/>)}
	  </ul>
	</BaseLayout>
	```

### Auto-generating tag list via [dynamic routing](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes)
This is great, but means updating the above list of tags manually. To auto-generate:

1. Check all blog posts contain tags!
2. create an array of tags using [Set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), which stores unique values of any type, and [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to flatten the array: `const uniqueTags = [...new Set(allPosts.map((post) => post.frontmatter.tags).flat())];`
3. Replace the return value of the getStaticPaths function with: 

	```jsx
	return uniqueTags.map((tag) => {
	    const filteredPosts = allPosts.filter((post) => post.frontmatter.tags.includes(tag));
	    return {
	      params: { tag },
	      props: { posts: filteredPosts },
	    };
	  });
	```

4. A getStaticPaths function should always return a list of objects containing params (what to call each page route) and optionally any props (data that you want to pass to those pages). Earlier, you defined each tag name that you knew was used in your blog and passed the entire list of posts as props to each page.

Now, you generate this list of objects automatically using your uniqueTags array to define each parameter.

And, now the list of all blog posts is filtered before it is sent to each page as props. Be sure to remove the previous line of code filtering the posts, and update your HTML template to use posts instead of filteredPosts:  
- replace `{filteredPosts.map((post) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}`
- with `{posts.map((post) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}`

## Build a tag index page: [static routing](https://docs.astro.build/en/core-concepts/routing/#static-routes)
- Add a new page using the /my-folder/index.astro routing pattern
- Display a list of all your unique tags, linking to each tag page
- Update your site with navigation links to this new Tags page



## [RSS feed](https://docs.astro.build/en/guides/rss/)
Docs on [pagesGlobToRssItems()](https://docs.astro.build/en/guides/rss/#using-glob-imports)
1. quit dev server and install astro RSS package: `npm install @astrojs/rss`;
2. Create an .xml feed document: `src/pages/rss.xml.js`
3. In that doc, adapt this boilerplate as necessary:
	
	```javascript
	import rss, { pagesGlobToRssItems } from '@astrojs/rss';
	
	export async function get() {
	  return rss({
	    title: 'Astro Learner | Blog',
	    description: 'My journey learning Astro',
	    site: 'https://my-blog-site.netlify.app',
	    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
	    customData: `<language>en-us</language>`,
	  });
	}
	```

4. This rss.xml document is only created when your site is built, so you won’t be able to see this page in your browser during development. Quit the dev server and run the following commands to first, build your site locally and then, view a preview of your build:  
`npm run build`  
`npm run preview`  
5. Visit localhost:3000/rss.xml and verify that you can see (unformatted) text on the page with an item for each of your .md files. Each item should contain blog post information such as title, url, and description.

6. Be sure to quit the preview and restart the dev server when you want to view your site in development mode again.

-->  Can now VIEW YOUR RSS FEED IN A READER

Download a feed reader, or sign up for an online feed reader service and subscribe to your site by adding your own Netlify URL. You can also share this link with others so they can subscribe to your posts, and be notified when a new one is published.

## [Astro islands](https://docs.astro.build/en/concepts/islands/)

### Add a UI framework to your Astro project
#### [Astro framework reference](https://docs.astro.build/en/core-concepts/framework-components/#using-framework-components)
#### [Astro integration guide](https://docs.astro.build/en/guides/integrations-guide/)

1. quit dev server and add preact: `npx astro add preact`
2. create `src/components/Greeting.jsx`
3. populate:
	
	```jsx
	import { h } from 'preact';
	import { useState } from 'preact/hooks';
	
	export default function Greeting({messages}) {
	
	  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];
	  
	  const [greeting, setGreeting] = useState(randomMessage());
	
	  return (
	    <div> 
	      <h3>{greeting}! Thank you for visiting!</h3>
	      <button onClick={() => setGreeting(randomMessage())}>
	        New Greeting
	      </button>
	    </div>
	  );
	}
	```

4. import into Homepage (`src/pages/index.astro`)

```jsx
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Greeting from '../components/Greeting';
const pageTitle = 'Winning Page';
---

<BaseLayout pageTitle={pageTitle}>
  <h2>My awesome blog subtitle</h2>
  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} />
</BaseLayout>
```
Now the site loads and shows the greeting and button, but the `New Greeting` button does not work. So:  
5. Add a second <Greeting /> component with the client:load directive.  
	`<Greeting client:load messages={["Hej", "Hallo", "Hola", "Habari"]} />`
This button works because `client:load` tells Astro to send and rerun its JavaScript to the client when the page loads, making the component interactive (ie - hydrating the component).  
6. 


### [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)

- client: load
	- load and hydrate the component JavaScript immediately on page load. 
	- for immediately-visible UI elements that need to be interactive as soon as possible.
- client:idle
	- Load and hydrate the component JavaScript once the page is done with its initial load and the requestIdleCallback event has fired. If you are in a browser that doesn’t support requestIdleCallback, then the document load event is used.
	- Useful for: Lower-priority UI elements that don’t need to be immediately interactive.
- client:visible
	- Load and hydrate the component JavaScript once the component has entered the user’s viewport. This uses an IntersectionObserver internally to keep track of visibility.
	- Useful for: Low-priority UI elements that are either far down the page (“below the fold”) or so resource-intensive to load that you would prefer not to load them at all if the user never saw the element.
- client: media
	- client:media={string} loads and hydrates the component JavaScript once a certain CSS media query is met.
	- Useful for: Sidebar toggles, or other elements that might only be visible on certain screen sizes.
- client: only
	- client:only={string} skips HTML server-rendering, and renders only on the client. It acts similar to client:load in that it loads, renders and hydrates the component immediately on page load.


## JS theme toggle
1. Create a new file at src/components/ThemeIcon.astro and paste the following code into it:
	
	```jsx
	src/components/ThemeIcon.astro
	---
	---
	<button id="themeToggle">
	  <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	    <path class="sun" fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"/>
	    <path class="moon" fill-rule="evenodd" d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"/>
	  </svg>
	</button>
	
	<style>
	  #themeToggle {
	    border: 0;
	    background: none;
	  }
	  .sun { fill: black; }
	  .moon { fill: transparent; }
	  
	
	  :global(.dark) .sun { fill: transparent; }
	  :global(.dark) .moon { fill: white; }
	</style>
	```

2. Add to Header/astro: `import ThemeIcon from './ThemeIcon.astro';` and instantiate `<ThemeIcon />`
3. Add dark theme CSS to `global.css`
	
	```css
	dark body {
	  background-color: #0d0950;
	  color: #fff;
	}
	
	.dark .nav-links a {
	  color: #fff;
	}
	```
4. Add client site interactivity with \<script> tag in ThemeIcon.astro

```jsx
    const theme: any = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        if (window.matchMedia('prefers-color-scheme: dark').matches) {
            return 'dark'
        }
        else {
            return 'light'
        }
    })();

    if (theme ==='light') {
        document.documentElement.classList.remove('dark');
    }
    else {
        document.documentElement.classList.add('dark');
    };

    window.localStorage.setItem('theme', theme);

    const handleToggleClick = () => {
        const element = document.documentElement;
        element.classList.toggle('dark');

        const isDark = element.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    document.getElementById("themeToggle")!.addEventListener("click", handleToggleClick); //! is the non-null assertion operator
```


# Migrating from file-based routing to document collection

1. Update `tsconfig.json`
	
	```json
	{
	  "extends": "astro/tsconfigs/strict",
	  "compilerOptions": {
	    "jsx": "react-jsx",
	    "jsxImportSource": "preact",
	    "strictNullChecks": true,
	    "allowJs": true
	  }
	}
	```

2. Move markdown files from `stc/pages/posts` -> `src/content/posts`
3. Create a src/content/config.ts file and [define a schema](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema) for each content type. For the blog, we only have one content type, posts:
	
	```typescript
	// Import utilities from `astro:content`
	import { z, defineCollection } from "astro:content";
	// Define a schema for each collection you'd like to validate.
	const postsCollection = defineCollection({
	    schema: z.object({
	      title: z.string(),
	      pubDate: z.date(),
	      description: z.string(),
	      author: z.string(),
	      image: z.object({
	        url: z.string(),
	        alt: z.string()
	      }).optional(),
	      tags: z.array(z.string())
	    })
	});
	// Export a single `collections` object to register your collection(s)
	export const collections = {
	  posts: postsCollection,
	};
	```
	--> ran `npx astro sync` to generate types and get rod of `cannot find module: astro:content` error

4. Generate routes from your collections. Inside a collection, Markdown and MDX files no longer automatically become pages using Astro’s file-based routing, so you must generate the pages yourself.
	
	For the tutorial, create a `src/pages/posts/[...slug].astro`. This page will use dynamic routing and to generate a page for each collection entry.
	
	This page will also need to query your collection to fetch page slugs and make the page content available to each route.
	
	Render your post <Content /> within the layout for your Markdown or MDX pages. This allows you to specify a common layout for all of your posts.
		
	```jsx
	---
	import { getCollection } from "astro:content";
	import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro';
	
	// query collection for posts
	
	export async function getStaticPaths() {
	    const blogEntries = await getCollection('posts');
	    return blogEntries.map(entry => ({
	        params: {slug: entry.slug}, props: {entry}
	    }));
	}
	
	const { entry } = Astro.props;
	const { Content } = await entry.render();
	---
	<!-- render -->
	
	<MarkdownPostLayout frontmatter={entry.data}>
	    <Content />
	</MarkdownPostLayout>
	```

5. Note that this wraps each post in \<MarkdownPostLayout>, meaning `layout: ../../layouts/MarkdownPostLayout.astro` can now be dropped from the markdown files
6. In `src/pages/Blog.astro` replace `Astro.glob()` with `getCollection()`:
	
	```jsx
	// const allPosts = await Astro.glob('../pages/posts/*.md');  
	`const allPosts = await getCollection('posts');`
	
	//....
	// {allPosts.map((post) => <BlogPost url={post.url} title={post.frontmatter.title} />)}
	{allPosts.map((post) => <BlogPost url={"/posts/" + post.slug} title={post.data.title} />)}
	```  

7. The tutorial blog project also dynamically generates a page for each tag. Update `src/pages/tags/[tag].astro`:
	
	```jsx
	// within getStaticPahts():
	// const allPosts = await Astro.glob('../posts/*.md');
	const allPosts = await getCollection("posts");
	
	// in getStaticPaths return clause
	/* 
	const uniqueTags = [...new Set (allPosts.map((post) => post.frontmatter.tags).flat())]
	
	  return uniqueTags.map((tag) => {
	    const filteredPosts = allPosts.filter((post) => post.frontmatter.tags.includes(tag));
	*/
	
	const uniqueTags = [...new Set (allPosts.map((post) => post.data.tags).flat())]
	  return uniqueTags.map((tag) => {
	    const filteredPosts = allPosts.filter((post) => post.data.tags.includes(tag));
	
	```
	
8. and again in the tag index page `src/pages/tags/index.astro`
9. and _again_ in the RSS feed: `src/pages/rss.xml.js`