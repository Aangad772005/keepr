import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { CategoryId, Task } from '../types'

export function useTasks(userId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setTasks(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Realtime: keep tasks in sync across devices/tabs
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => {
              if (prev.some((t) => t.id === (payload.new as Task).id)) return prev
              return [payload.new as Task, ...prev]
            })
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((t) => (t.id === (payload.new as Task).id ? (payload.new as Task) : t))
            )
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((t) => t.id !== (payload.old as Task).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const addTask = useCallback(
    async (title: string, category: CategoryId) => {
      if (!userId) return
      const trimmed = title.trim()
      if (!trimmed) return

      // Optimistic local insert
      const tempId = `temp-${Date.now()}`
      const optimisticTask: Task = {
        id: tempId,
        user_id: userId,
        title: trimmed,
        category,
        done: false,
        created_at: new Date().toISOString(),
      }
      setTasks((prev) => [optimisticTask, ...prev])

      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert({ title: trimmed, category, user_id: userId, done: false })
        .select()
        .single()

      if (insertError) {
        setError(insertError.message)
        setTasks((prev) => prev.filter((t) => t.id !== tempId))
      } else if (data) {
        setTasks((prev) => prev.map((t) => (t.id === tempId ? (data as Task) : t)))
      }
    },
    [userId]
  )

  const toggleDone = useCallback(async (id: string, done: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)))
    const { error: updateError } = await supabase.from('tasks').update({ done }).eq('id', id)
    if (updateError) setError(updateError.message)
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
  }, [])

  return { tasks, loading, error, addTask, toggleDone, deleteTask }
}
