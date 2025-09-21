import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Music, Users, Palette, Utensils, Gamepad2, Trophy, BookOpen, Camera } from 'lucide-react'

interface CategorySelectionProps {
  onContinue: (categories: string[]) => void
  selectedCategories: string[]
}

const categories = [
  { id: 'music', name: 'Music', icon: Music, color: 'bg-app-gold' },
  { id: 'social', name: 'Social', icon: Users, color: 'bg-app-coral' },
  { id: 'arts', name: 'Arts', icon: Palette, color: 'bg-app-teal' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-app-gold' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'bg-app-coral' },
  { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-app-teal' },
  { id: 'study', name: 'Study', icon: BookOpen, color: 'bg-app-gold' },
  { id: 'photo', name: 'Photography', icon: Camera, color: 'bg-app-coral' },
]

export default function CategorySelection({ onContinue, selectedCategories }: CategorySelectionProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories)

  const toggleCategory = (categoryId: string) => {
    setSelected(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="flex flex-col h-screen bg-app-dark text-white p-6">
      {/* Header */}
      <div className="pt-16 pb-8">
        <div className="w-full bg-app-surface rounded-full h-2 mb-8">
          <div className="bg-app-gold h-2 rounded-full w-1/3"></div>
        </div>
        <h1 className="text-2xl font-medium mb-2">What interests you?</h1>
        <p className="text-gray-400">Choose categories that match your preferences</p>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon
          const isSelected = selected.includes(category.id)
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`
                relative bg-app-card rounded-2xl p-6 aspect-square flex flex-col items-center justify-center
                transition-all duration-200 border-2
                ${isSelected 
                  ? `border-white shadow-lg shadow-white/10` 
                  : 'border-transparent hover:border-gray-600'
                }
              `}
            >
              <div className={`${category.color} rounded-full p-3 mb-3`}>
                <IconComponent className="w-6 h-6 text-black" />
              </div>
              <span className="text-sm font-medium text-center">{category.name}</span>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-app-dark rounded-full"></div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Continue Button */}
      <Button 
        onClick={() => onContinue(selected)}
        disabled={selected.length === 0}
        className="w-full bg-app-gold text-black font-medium py-4 rounded-2xl hover:bg-app-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue ({selected.length} selected)
      </Button>
    </div>
  )
}
