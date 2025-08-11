'use client'

import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthForm() {
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')
  const supabase = createClient()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {view === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </CardTitle>
        <CardDescription>
          {view === 'sign-in' 
            ? 'Welcome back! Sign in to your account.' 
            : 'Create a new account to get started.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary))',
                },
              },
            },
          }}
          theme="dark"
          showLinks={true}
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
          magicLink={true}
        />
        <div className="mt-4 text-center">
          <button
            onClick={() => setView(view === 'sign-in' ? 'sign-up' : 'sign-in')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {view === 'sign-in' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
