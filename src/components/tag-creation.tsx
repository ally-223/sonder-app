import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Plus, X } from 'lucide-react'

interface TagCreationProps {
  onContinue: (tags: string[]) => void
  createdTags: string[]
}

const exampleTags = ['Study Group', 'Coffee Chat', 'Movie Night', 'Workout', 'Board Games']

export default function TagCreation({ onContinue, createdTags }: TagCreationProps) {
  const [tags, setTags] = useState<string[]>(createdTags.length > 0 ? createdTags : exampleTags)
  const [newTag, setNewTag] = useState('')

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTag()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-app-dark text-white p-6">
      {/* Header */}
      <div className="pt-16 pb-8">
        <div className="w-full bg-app-surface rounded-full h-2 mb-8">
          <div className="bg-app-gold h-2 rounded-full w-3/4"></div>
        </div>
        <h1 className="text-2xl font-medium mb-2">Create your tags</h1>
        <p className="text-gray-400">Add tags to help others find your events</p>
      </div>

      {/* Tag Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <Input
            placeholder="Enter a tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-app-surface border-0 text-white placeholder:text-gray-400 rounded-xl py-3"
          />
          <Button
            onClick={addTag}
            disabled={!newTag.trim()}
            className="bg-app-coral text-white p-3 rounded-xl hover:bg-app-coral/90 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tags List */}
      <div className="flex-1 mb-8">
        <h3 className="text-lg font-medium mb-4">Your Tags</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-app-surface px-4 py-2 rounded-full"
            >
              <span className="text-sm">{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        {tags.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No tags yet. Add some to get started!</p>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <Button 
        onClick={() => onContinue(tags)}
        disabled={tags.length === 0}
        className="w-full bg-app-gold text-black font-medium py-4 rounded-2xl hover:bg-app-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue ({tags.length} tags)
      </Button>
    </div>
  )
}
