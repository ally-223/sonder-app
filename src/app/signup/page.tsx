'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/auth-provider'
import { createClient } from '@/lib/supabase'
import AvailabilitySelection from '@/components/availability-selection'
import CategorySelection from '@/components/category-selection'
import TagCreation from '@/components/tag-creation'

export default function SignupPage() {
  const [step, setStep] = useState<'categories' | 'tags' | 'availability' | 'complete'>('categories')
  const [loading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  // Handle redirect when user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const handleCategoryComplete = (categories: string[]) => {
    setSelectedCategories(categories)
    setStep('tags')
  }

  const handleTagComplete = (tags: string[]) => {
    setSelectedTags(tags)
    setStep('availability')
  }

  const handleAvailabilityComplete = async (availabilityData: Set<string>) => {
    setLoading(true)
    
    try {
      // Save user profile with onboarding completed
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          email: user?.email,
          onboarding_completed: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (profileError) {
        console.error('Error saving profile:', profileError)
        return
      }

      // Save user categories
      if (selectedCategories.length > 0) {
        const categoryData = selectedCategories.map(category => ({
          user_id: user?.id,
          category: category,
          created_at: new Date().toISOString()
        }))

        const { error: categoryError } = await supabase
          .from('user_categories')
          .insert(categoryData)

        if (categoryError) {
          console.error('Error saving categories:', categoryError)
        }
      }

      // Save user tags
      if (selectedTags.length > 0) {
        const tagData = selectedTags.map(tag => ({
          user_id: user?.id,
          tag: tag,
          created_at: new Date().toISOString()
        }))

        const { error: tagError } = await supabase
          .from('user_tags')
          .insert(tagData)

        if (tagError) {
          console.error('Error saving tags:', tagError)
        }
      }

      // Save availability data
      const availabilityArray = Array.from(availabilityData).map(slot => {
        const [day, time] = slot.split('-')
        return {
          user_id: user?.id,
          day_of_week: day,
          time_slot: time,
          created_at: new Date().toISOString()
        }
      })

      if (availabilityArray.length > 0) {
        const { error: availabilityError } = await supabase
          .from('user_availability')
          .insert(availabilityArray)

        if (availabilityError) {
          console.error('Error saving availability:', availabilityError)
        }
      }

      setStep('complete')
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Error completing signup:', error)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Setup Complete!</h1>
          <p className="text-muted-foreground">Redirecting you to your dashboard...</p>
        </div>
      </div>
    )
  }

  if (step === 'categories') {
    return <CategorySelection onContinue={handleCategoryComplete} selectedCategories={selectedCategories} />
  }

  if (step === 'tags') {
    return <TagCreation onContinue={handleTagComplete} createdTags={selectedTags} />
  }

  return <AvailabilitySelection onContinue={handleAvailabilityComplete} loading={loading} />
}
