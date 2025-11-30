# Interactive Portfolio

A stunning, interactive personal portfolio built with Next.js and Three.js, featuring 3D animations, smooth transitions, and a modern UI.

## Features

- 🎨 **Modern Design**: Beautiful glassmorphism UI with gradient accents
- 🎭 **3D Elements**: Interactive Three.js scenes and animations
- ✨ **Smooth Animations**: Framer Motion for fluid transitions
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🎯 **Interactive Particles**: Dynamic particle background
- 🌈 **Gradient Effects**: Eye-catching gradient text and backgrounds

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update name, title, and description
   - Add your social media links

2. **About Section** (`components/About.tsx`):
   - Modify the journey and skills description
   - Update feature cards

3. **Skills Section** (`components/Skills.tsx`):
   - Adjust skill categories and proficiency levels

4. **Projects Section** (`components/Projects.tsx`):
   - Replace with your actual projects
   - Update project links and descriptions

5. **Contact Section** (`components/Contact.tsx`):
   - Update contact information
   - Connect form to your email service (e.g., Formspree, EmailJS)

### Styling

- Colors: Edit `tailwind.config.js` to change the color scheme
- Fonts: Modify `app/layout.tsx` to use different Google Fonts
- Animations: Adjust Framer Motion animations in component files

## Project Structure

```
arjun_portfolio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Navigation.tsx   # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── Scene3D.tsx      # 3D scene component
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills section
│   ├── Projects.tsx     # Projects section
│   ├── Contact.tsx      # Contact section
│   └── ParticleBackground.tsx # Particle effect
├── public/              # Static assets
└── package.json         # Dependencies
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Your own server

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Built with love using Next.js, Three.js, and modern web technologies.

