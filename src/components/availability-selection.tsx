'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Upload, Calendar } from 'lucide-react'

interface AvailabilitySelectionProps {
  onContinue: (availabilityData: Set<string>) => void
  loading?: boolean
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const timeSlots = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

export default function AvailabilitySelection({ onContinue, loading = false }: AvailabilitySelectionProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('manual')

  const toggleSlot = (day: string, time: string) => {
    const slotKey = `${day}-${time}`
    const newSlots = new Set(selectedSlots)
    
    if (newSlots.has(slotKey)) {
      newSlots.delete(slotKey)
    } else {
      newSlots.add(slotKey)
    }
    
    setSelectedSlots(newSlots)
  }

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlots.has(`${day}-${time}`)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="pt-16 pb-8">
        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div className="bg-primary h-2 rounded-full w-full"></div>
        </div>
        <h1 className="text-2xl font-medium mb-2">Set your availability</h1>
        <p className="text-muted-foreground">When are you free to attend events?</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl p-1 mb-6">
          <TabsTrigger 
            value="upload" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
          >
            <Upload className="w-4 h-4" />
            Upload Calendar
          </TabsTrigger>
          <TabsTrigger 
            value="manual" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
          >
            <Calendar className="w-4 h-4" />
            Manual Selection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="bg-muted rounded-2xl p-8 mb-6">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Your Calendar</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Import your existing calendar to automatically set your availability
              </p>
              <Button className="bg-primary text-primary-foreground font-medium px-8 py-3 rounded-xl hover:bg-primary/90">
                Choose Calendar File
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="flex-1 flex flex-col">
          <div className="flex-1 mb-6">
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div></div>
              {days.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-8 gap-2 items-center">
                  <div className="text-xs text-muted-foreground text-right pr-2">
                    {time}
                  </div>
                  {days.map(day => (
                    <button
                      key={`${day}-${time}`}
                      onClick={() => toggleSlot(day, time)}
                      className={`
                        aspect-square rounded-lg border-2 transition-all duration-200
                        ${isSlotSelected(day, time)
                          ? 'bg-primary border-primary'
                          : 'border-muted hover:border-border'
                        }
                      `}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Continue Button */}
      <Button 
        onClick={() => onContinue(selectedSlots)}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground font-medium py-4 rounded-2xl hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Continue'}
      </Button>
    </div>
  )
}
