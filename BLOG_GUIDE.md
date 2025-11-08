# How to Add a New Blog Post

This guide explains how to add a new blog post to your portfolio website.

## Steps to Add a New Blog Post

### 1. Open the Blog Posts Data File

Navigate to `src/data/blogPosts.ts` - this is where all blog posts are stored.

### 2. Add Your New Post

Add a new object to the `blogPosts` array. Here's the template:

```typescript
{
  id: 7, // Increment from the last post ID
  title: 'Your Blog Post Title',
  excerpt: 'A brief summary of your blog post (1-2 sentences).',
  date: 'March 20, 2024', // Format: Month Day, Year
  category: 'Technology', // Choose from: Business, Technology, Design, Development, or add a new one
  image: '/your-image.jpg', // Path to image in public folder, or use '/api/placeholder/600/400' for placeholder
  slug: 'your-blog-post-slug', // URL-friendly version of title (lowercase, hyphens instead of spaces)
  author: 'Mujahid Shahid', // Your name
  content: `
    <p className="mb-6 text-[#666666] leading-relaxed">
      Your opening paragraph goes here.
    </p>
    
    <h2 className="text-3xl font-bold text-[#1f1f1f] mb-4 mt-8">Section Heading</h2>
    <p className="mb-6 text-[#666666] leading-relaxed">
      Your content paragraph here.
    </p>
    
    <h2 className="text-3xl font-bold text-[#1f1f1f] mb-4 mt-8">Another Section</h2>
    <p className="mb-6 text-[#666666] leading-relaxed">
      More content here.
    </p>
  `,
}
```

### 3. Important Notes

- **ID**: Must be unique. Always increment from the highest existing ID.
- **Slug**: Should be URL-friendly:
  - Lowercase
  - Use hyphens instead of spaces
  - No special characters
  - Example: `'my-awesome-blog-post'`
- **Image**: 
  - Place images in the `public/` folder
  - Reference them as `'/your-image.jpg'`
  - Or use `'/api/placeholder/600/400'` for a placeholder
- **Content**: 
  - Use HTML with className attributes
  - Use the provided className patterns for consistency
  - Headings: `className="text-3xl font-bold text-[#1f1f1f] mb-4 mt-8"`
  - Paragraphs: `className="mb-6 text-[#666666] leading-relaxed"`

### 4. Categories

If you want to add a new category:
1. Add it to your post's `category` field
2. The category filter will automatically include it (no code changes needed)

### 5. Example Blog Post

```typescript
{
  id: 7,
  title: 'Getting Started with Next.js 14',
  excerpt: 'Learn the basics of Next.js 14 and build your first application.',
  date: 'March 20, 2024',
  category: 'Development',
  image: '/nextjs-blog.jpg',
  slug: 'getting-started-with-nextjs-14',
  author: 'Mujahid Shahid',
  content: `
    <p className="mb-6 text-[#666666] leading-relaxed">
      Next.js 14 brings exciting new features and improvements. In this guide,
      we'll explore the fundamentals and get you started on your Next.js journey.
    </p>
    
    <h2 className="text-3xl font-bold text-[#1f1f1f] mb-4 mt-8">What is Next.js?</h2>
    <p className="mb-6 text-[#666666] leading-relaxed">
      Next.js is a React framework that enables server-side rendering and static
      site generation, making it perfect for building modern web applications.
    </p>
    
    <h2 className="text-3xl font-bold text-[#1f1f1f] mb-4 mt-8">Key Features</h2>
    <p className="mb-6 text-[#666666] leading-relaxed">
      Next.js 14 introduces the App Router, improved performance, and better
      developer experience with TypeScript support out of the box.
    </p>
  `,
}
```

### 6. Test Your Post

1. Save the file
2. Run your development server: `npm run dev`
3. Navigate to `/blog` to see your new post in the listing
4. Click on your post to view the full article
5. Verify the slug matches: `/blog/your-blog-post-slug`

## File Structure

```
src/
├── data/
│   └── blogPosts.ts       # All blog posts data
├── app/
│   └── blog/
│       ├── page.tsx       # Blog listing page
│       └── [slug]/
│           └── page.tsx   # Individual blog post page
```

## Tips

- **Keep excerpts short**: 1-2 sentences that entice readers
- **Use descriptive slugs**: Make them SEO-friendly and readable
- **Add images**: Visual content makes posts more engaging
- **Structure content**: Use headings to break up long content
- **Update dates**: Keep posts organized by date

That's it! Your new blog post will automatically appear on the blog page and be accessible via its slug URL.

