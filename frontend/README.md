# RepoTalk Frontend

A beautiful, modern React application that allows non-technical users to have conversations with GitHub repositories using plain English.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A backend server running on port 8000 (or configure `VITE_API_BASE_URL`)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── chat/                # Chat interface components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── repo/                # Repository input components
│   │   │   └── RepoInput.tsx
│   │   └── layout/              # Layout components
│   │       ├── Header.tsx
│   │       └── WelcomeScreen.tsx
│   ├── context/                 # React Context providers
│   │   ├── ChatContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/                # API and storage services
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── chat.types.ts
│   │   ├── repo.types.ts
│   │   └── api.types.ts
│   ├── utils/                   # Utility functions
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

## 🎨 Features

### ✅ Implemented

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **GitHub Integration**: Validate and connect to any public GitHub repository
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Code Highlighting**: Syntax highlighting for 20+ programming languages
- **Copy to Clipboard**: Easy code snippet copying
- **Recent Repositories**: Quick access to recently used repositories
- **Error Handling**: Comprehensive error handling with retry options
- **Loading States**: Beautiful loading animations and spinners
- **Accessibility**: WCAG 2.1 AA compliant
- **TypeScript**: Fully typed for better developer experience
- **Local Storage**: Persist chat history and preferences

### 🎯 Key Components

#### WelcomeScreen
- Hero section with app description
- Repository URL input with validation
- Recent repositories list
- Feature highlights
- How it works section

#### ChatInterface
- Message list with auto-scroll
- User and AI message bubbles
- Typing indicator
- Message input with example prompts
- Code syntax highlighting
- Copy-to-clipboard functionality

#### Header
- App branding
- Current repository display
- Theme toggle (light/dark)
- Clear chat button
- Back navigation

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code highlighting
- **Zustand** - State management (optional)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS with a custom configuration:

- **Primary Colors**: Blue shades for main actions
- **Secondary Colors**: Gray shades for backgrounds and text
- **Dark Mode**: Class-based dark mode
- **Custom Animations**: Typing, fade-in, slide-up

### Theme

Toggle between light and dark themes using the button in the header. The theme preference is saved to localStorage.

## 🔌 API Integration

The frontend communicates with the backend through three main endpoints:

### 1. Validate Repository
```typescript
POST /api/repo/validate
Body: { repoUrl: string }
```

### 2. Send Message
```typescript
POST /api/chat/message
Body: { repoUrl: string, message: string, sessionId?: string }
```

### 3. Get Repository Info
```typescript
GET /api/repo/info?url=<repo_url>
```

See `API_CONTRACT.md` for complete API documentation.

## 🌍 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=RepoTalk
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA labels and roles
- Focus management
- Color contrast compliance
- Text scaling support

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with UI
npm run test:ui
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# The build output will be in the `dist` folder
```

### Deployment Options

- **Vercel**: Recommended for React apps
- **Netlify**: Easy deployment with CI/CD
- **AWS S3 + CloudFront**: Scalable hosting
- **GitHub Pages**: Free hosting for public repos

## 🐛 Troubleshooting

### Port Already in Use

Vite will automatically try the next available port if 3000 is in use.

### TypeScript Errors

Ensure all dependencies are installed:
```bash
npm install
```

### Tailwind Styles Not Working

1. Check that PostCSS and Tailwind are properly configured
2. Restart the dev server
3. Clear browser cache

### API Connection Issues

1. Verify backend server is running on port 8000
2. Check CORS configuration
3. Verify `.env` file has correct API URL

## 📚 Documentation

- `ARCHITECTURE.md` - Technical architecture and design decisions
- `IMPLEMENTATION_GUIDE.md` - Step-by-step implementation guide
- `COMPONENT_SPECS.md` - Detailed component specifications
- `API_CONTRACT.md` - Backend API contract
- `COMPLETE_COMPONENTS.md` - All component code
- `SETUP_INSTRUCTIONS.md` - Setup and configuration guide

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Submit a pull request

## 📄 License

This project is part of the RepoTalk application.

## 🙏 Acknowledgments

- **IBM Bob AI** - Powers the code analysis
- **React Team** - Amazing UI library
- **Tailwind Labs** - Beautiful utility-first CSS
- **Vite Team** - Lightning-fast build tool

---

**Need Help?** Check the documentation files or open an issue.

**Ready to Start?** Run `npm install` and `npm run dev`!