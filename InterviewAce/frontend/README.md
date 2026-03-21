# InterviewAce - Frontend

A React + JSX + Vite frontend for the InterviewAce AI-powered mock interview platform.

## Tech Stack

- **React 19** - UI library
- **JSX** - Templating (no TypeScript)
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/assets/` - Static assets
- `public/` - Public static files

## Features

- Select tech stack for interview prep
- Answer interview questions
- Get instant AI-powered feedback via Groq API
- Track interview results and progress

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
