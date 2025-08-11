# Sonder - Next.js 14 App with Supabase

A modern Next.js 14 application built with TypeScript, Tailwind CSS, and Supabase integration. Features authentication, event management, and user profiles.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for authentication, database, and storage
- **shadcn/ui** components for beautiful UI
- **Email/Password & Magic Link** authentication
- **Responsive design** with modern UI
- **Protected routes** for authenticated users

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sonder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication routes
│   ├── events/            # Events page
│   ├── profile/           # Profile page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client configuration
│   └── utils.ts           # General utilities
└── types/                 # TypeScript type definitions
```

## Authentication

The app includes a complete authentication system with:

- **Email/Password** sign up and sign in
- **Magic Link** authentication
- **Protected routes** for authenticated users
- **Automatic session management**

### Authentication Flow

1. Users can sign up with email/password or use magic link
2. Authentication state is managed globally with React Context
3. Protected routes redirect unauthenticated users to sign in
4. Session persistence across browser sessions

## Pages

### Home Page (`/`)
- Shows different content for signed-in vs signed-out users
- Navigation cards to Events and Profile pages
- User activity overview

### Events Page (`/events`)
- Browse and discover events
- Create new events (placeholder)
- Event management interface

### Profile Page (`/profile`)
- User profile management
- Account settings
- Activity statistics
- Preferences configuration

## Database Schema

The app is structured to support the following data models:

### Users
- Managed by Supabase Auth
- Additional profile data can be stored in a `profiles` table

### Events
- Event details (title, description, date, location)
- Event creator and attendees
- Event categories and tags

### Profiles
- Extended user information
- User preferences and settings
- Activity history

## Styling

The app uses a modern design system with:

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent UI
- **CSS Variables** for theming
- **Responsive design** for all screen sizes
- **Dark mode** support (ready to implement)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Import and use the `useAuth` hook for protected routes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side) | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
