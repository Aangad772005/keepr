import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useTasks } from './hooks/useTasks'
import { SignIn } from './components/SignIn'
import { Composer } from './components/Composer'
import { TaskGrid } from './components/TaskGrid'
import { CATEGORIES, type CategoryId } from './types'

function App() {
  const { session, authLoading, signInWithEmail, signOut } = useAuth()
  const userId = session?.user?.id ?? null
  const { tasks, loading, error, addTask, toggleDone, deleteTask } = useTasks(userId)
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center text-ink-dim">Loading…</div>
  }

  if (!session) {
    return <SignIn onSubmit={signInWithEmail} />
  }

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.category === filter)

  return (
    <div className="min-h-screen pb-16">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <h1 className="font-display text-[18px] font-semibold text-ink">Keepr</h1>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-[13px] text-ink-dim hover:text-ink"
        >
          Sign out
        </button>
      </header>

      <main className="px-4 pt-8">
        <Composer onAdd={addTask} />

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2 px-4">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-pill border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              filter === 'all'
                ? 'border-accent bg-accent/15 text-ink'
                : 'border-border text-ink-dim hover:border-border-light hover:text-ink'
            }`}
          >
            All
          </button>
          {CATEGORIES.filter((c) => c.id !== 'none').map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                filter === cat.id
                  ? 'border-accent bg-accent/15 text-ink'
                  : 'border-border text-ink-dim hover:border-border-light hover:text-ink'
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mx-auto mt-4 max-w-xl text-center text-[13px] text-cat-urgent-text">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-16 text-center text-[13.5px] text-ink-faint">Loading your tasks…</p>
        ) : (
          <TaskGrid tasks={filteredTasks} onToggle={toggleDone} onDelete={deleteTask} />
        )}
      </main>
    </div>
  )
}

export default App
