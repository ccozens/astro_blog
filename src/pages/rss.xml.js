import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
    return rss({
        title: 'Chris Cozens',
        description: 'My journey learning Astro',
        site: 'https://https://incandescent-otter.netlify.app/',
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        customData: `<language>en-gb</language>`,  
    })
}