# Signup Flow with Availability Selection Setup

This document explains how to set up the new signup flow that includes an availability selection step for new users.

## Overview

When a user signs up for the first time, they will be redirected to `/signup` where they can set their availability for attending events. The flow includes:

1. **Authentication**: User signs up through Supabase Auth
2. **Availability Selection**: User sets their weekly availability
3. **Profile Creation**: User profile is created with onboarding completed
4. **Redirect**: User is redirected to the main dashboard

## Database Setup

Before running the application, you need to create the required database tables. Run the SQL commands in `database-schema.sql` in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database-schema.sql
```

This will create:
- `profiles` table: Stores user profile information and onboarding status
- `user_availability` table: Stores user's weekly availability slots
- Row Level Security (RLS) policies for data protection

## Components Added

### 1. Tabs Component (`src/components/ui/tabs.tsx`)
- Radix UI tabs component with proper styling
- Used for switching between calendar upload and manual selection

### 2. Availability Selection (`src/components/availability-selection.tsx`)
- Main component for setting weekly availability
- Two tabs: Calendar Upload and Manual Selection
- Interactive grid for selecting time slots
- Progress indicator showing signup completion

### 3. Signup Page (`src/app/signup/page.tsx`)
- Handles the complete signup flow
- Saves user profile and availability data
- Shows completion screen before redirecting

## Modified Files

### Auth Callback (`src/app/auth/callback/route.ts`)
- Checks if user has completed onboarding
- Redirects new users to `/signup`
- Redirects existing users to their intended destination

## Usage

1. **New User Signup**:
   - User signs up through the auth form
   - Auth callback detects new user and redirects to `/signup`
   - User sets availability and completes onboarding
   - User is redirected to main dashboard

2. **Existing User Login**:
   - User signs in through the auth form
   - Auth callback detects existing user and redirects to intended destination

## Data Structure

### Profiles Table
```sql
profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### User Availability Table
```sql
user_availability (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  day_of_week TEXT, -- 'Sun', 'Mon', 'Tue', etc.
  time_slot TEXT,   -- '9:00', '10:00', etc.
  created_at TIMESTAMP
)
```

## Styling

The components use the existing design system with:
- Tailwind CSS classes
- Consistent color scheme (`bg-primary`, `text-primary-foreground`, etc.)
- Responsive design
- Dark mode support

## Future Enhancements

1. **Calendar Integration**: Implement actual calendar file upload functionality
2. **Availability Validation**: Add validation for minimum availability requirements
3. **Edit Profile**: Allow users to update their availability later
4. **Event Matching**: Use availability data to suggest events to users
