// import utilites
import { z, defineCollection } from 'astro:content';

// define schema
const postsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        image: z.object({
            url: z.string(),
            alt: z.string()
        }).optional(),
        tags: z.array(z.string())
    })
});

// export a single 'collections' object
export const collectons = {
    posts: postsCollection
};