import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export async function get() {
    const posts = await getCollection("posts");
    return rss({
        title: 'Chris Cozens',
        description: 'My journey learning Astro',
        site: 'https://https://incandescent-otter.netlify.app/',
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
          })),
        customData: `<language>en-gb</language>`,  
    })
}