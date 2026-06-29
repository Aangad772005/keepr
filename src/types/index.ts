export type CategoryId = 'work' | 'personal' | 'urgent' | 'ideas' | 'none'

export interface Category {
  id: CategoryId
  label: string
  icon: string // emoji glyph, swap for an icon set later if you like
}

export const CATEGORIES: Category[] = [
  { id: 'none', label: 'No category', icon: '◌' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'personal', label: 'Personal', icon: '🏡' },
  { id: 'urgent', label: 'Urgent', icon: '⚡' },
  { id: 'ideas', label: 'Ideas', icon: '💡' },
]

export interface Task {
  id: string
  user_id?: string
  title: string
  category: CategoryId
  done: boolean
  created_at: string
}
