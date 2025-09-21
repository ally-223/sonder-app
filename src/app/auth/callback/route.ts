import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('Auth callback received:', { code: code ? 'present' : 'missing', next, origin })

  if (!code) {
    console.error('No code parameter found in auth callback')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    if (!data.session) {
      console.error('No session returned from code exchange')
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    console.log('Successfully authenticated user:', data.session.user.email)

    // Check if this is a new user (first time signing up)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', data.session.user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('Error fetching profile:', profileError)
    }

    // If no profile exists or onboarding is not completed, redirect to signup
    if (!profile || !profile.onboarding_completed) {
      console.log('User needs onboarding, redirecting to signup')
      const forwardedHost = request.headers.get('x-forwarded-host')
      const redirectUrl = forwardedHost ? `https://${forwardedHost}/signup` : `${origin}/signup`
      return NextResponse.redirect(redirectUrl)
    }

    // Otherwise, redirect to the intended destination
    console.log('User onboarding completed, redirecting to:', next)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const redirectUrl = forwardedHost ? `https://${forwardedHost}${next}` : `${origin}${next}`
    return NextResponse.redirect(redirectUrl)

  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}
