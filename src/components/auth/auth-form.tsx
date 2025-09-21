'use client'

import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthForm() {
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in')
  const supabase = createClient()

  // Debug: Check if AuthForm is rendering
  console.log('AuthForm rendering, view:', view)
  console.log('Supabase client:', supabase)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {view === 'sign_in' ? 'Sign In' : 'Sign Up'}
        </CardTitle>
        <CardDescription>
          {view === 'sign_in' 
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
      </CardContent>
    </Card>
  )
}
