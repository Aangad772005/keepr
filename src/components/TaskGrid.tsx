import type { Task } from '../types'
import { TaskCard } from './TaskCard'

interface TaskGridProps {
  tasks: Task[]
  onToggle: (id: string, done: boolean) => void
  onDelete: (id: string) => void
}

export function TaskGrid({ tasks, onToggle, onDelete }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
      <div className="mx-auto mt-20 max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-card text-2xl">
          ✓
        </div>
        <p className="font-display text-[15px] font-semibold text-ink-dim">Nothing here yet</p>
        <p className="mt-1 text-[13.5px] text-ink-faint">
          Add a task above to get started. Tag it with a category to keep things sorted.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl columns-1 gap-4 px-4 sm:columns-2 lg:columns-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
