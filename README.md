# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio is inspired by the clean and professional design of the Imroz portfolio theme.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Fade-in and scroll animations throughout
- **Interactive Components**: 
  - Sticky navigation header
  - Portfolio filtering
  - Contact form
  - Blog listing and individual post pages
- **Performance Optimized**: Built with Next.js 16 for optimal performance
- **TypeScript**: Full type safety for better code quality

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx      # Individual blog post page
│   │   │   └── page.tsx           # Blog listing page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css             # Global styles
│   └── components/
│       ├── Header.tsx             # Navigation header
│       ├── Hero.tsx               # Hero section
│       ├── About.tsx              # About section
│       ├── Services.tsx           # Services section
│       ├── Portfolio.tsx          # Portfolio section
│       ├── Contact.tsx            # Contact section
│       └── Footer.tsx             # Footer component
├── public/                         # Static assets
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update name, title, and description
   - Replace placeholder avatar/initials

2. **About Section** (`src/components/About.tsx`):
   - Update skills and proficiency levels
   - Modify experience timeline
   - Update biography text

3. **Services Section** (`src/components/Services.tsx`):
   - Customize services offered
   - Update icons and descriptions

4. **Portfolio Section** (`src/components/Portfolio.tsx`):
   - Add your actual projects
   - Update project images, titles, and descriptions
   - Adjust categories as needed

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information (email, phone, location)
   - Connect form to your backend/email service

6. **Footer** (`src/components/Footer.tsx`):
   - Update social media links
   - Modify footer content

### Color Scheme

The color scheme can be customized in `src/app/globals.css`:

```css
:root {
  --primary: #ff6b6b;      /* Primary accent color */
  --secondary: #4ecdc4;     /* Secondary accent color */
  --accent: #45b7d1;        /* Additional accent */
  --text-primary: #1f1f1f;  /* Main text color */
  --text-secondary: #666666; /* Secondary text color */
}
```

### Typography

Fonts are configured in `src/app/layout.tsx`. Currently using:
- **Inter** for body text
- **Playfair Display** for serif headings

You can change these by importing different fonts from Google Fonts.

## Building for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Key Components Explained

### Header
- Sticky navigation that becomes opaque on scroll
- Mobile-responsive hamburger menu
- Smooth scroll to sections

### Hero
- Eye-catching introduction section
- Call-to-action buttons
- Animated elements on load

### About
- Personal information and biography
- Animated skill bars
- Experience timeline

### Services
- Grid of service cards
- Hover effects and animations
- Icon-based visual representation

### Portfolio
- Project filtering by category
- Hover effects on project cards
- Responsive grid layout

### Contact
- Contact information display
- Functional contact form
- Responsive two-column layout

### Blog
- Blog post listing page
- Individual blog post pages
- Category filtering (ready for implementation)

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **React 19**: Latest React version

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Images should be optimized before adding to the project
- Consider using Next.js Image component for better performance
- Lazy load animations for better initial page load
- Use production build for deployment

## Deployment

This portfolio can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting service**

For Vercel deployment:
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

## License

This project is open source and available for personal use.

## Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**Note**: Remember to replace placeholder content with your actual information, images, and project details before deploying to production.
