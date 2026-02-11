import { getCollection } from 'astro:content';

export async function GET() {
    const docs = await getCollection('docs');
    const blog = await getCollection('blog');

    const docsIndex = docs.map((doc) => ({
        title: doc.data.title,
        description: doc.data.description,
        slug: `/docs/${doc.slug}`,
        type: 'Docs',
    }));

    const blogIndex = blog.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        slug: `/blog/${post.slug}`,
        type: 'Blog',
    }));

    return new Response(JSON.stringify([...docsIndex, ...blogIndex]), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
