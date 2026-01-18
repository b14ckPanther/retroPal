# RetroPal 🕹️

A nostalgic retro arcade gaming platform where you can play classic-style browser games. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎮 **Game Library** - Browse and play nostalgic retro games
- 🏆 **Leaderboards** - Track your high scores and compete with others
- 📊 **Profile System** - Track achievements, play history, and stats
- 💾 **Local Storage** - Save progress using browser localStorage
- 🎨 **Retro Aesthetic** - Authentic arcade-style UI with neon effects
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd retroarcade
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
retroarcade/
├── app/                    # Next.js app directory
│   ├── games/             # Game pages and player
│   ├── leaderboards/      # Leaderboards page
│   └── profile/           # User profile page
├── components/            # React components
│   ├── games/            # Game-related components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── ui/               # UI components
├── lib/                   # Utilities and game data
├── public/                # Static assets
│   └── games/            # Game files and thumbnails
└── stores/                # Zustand state management
```

## Building for Production

```bash
npm run build
npm run start
```

## Deployment to Cloudflare Pages

1. Push your code to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node version**: `18` or `20`
5. Deploy!

**Note**: For Next.js on Cloudflare Pages, you may need to use `@cloudflare/next-on-pages` adapter. See [Cloudflare Next.js docs](https://developers.cloudflare.com/pages/framework-guides/nextjs/) for details.

Alternatively, you can deploy to:
- **Vercel** - Recommended for Next.js projects
- **Netlify** - Supports Next.js
- **Railway** - Easy deployment platform

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React** - UI library

## License

© 2024 RetroPal. All rights reserved. Developed by nmProfessor

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
