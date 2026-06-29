import { CATEGORIES, type Task } from '../types'

interface TaskCardProps {
  task: Task
  onToggle: (id: string, done: boolean) => void
  onDelete: (id: string) => void
}

const CAT_STYLES: Record<string, string> = {
  work: 'bg-cat-work-bg text-cat-work-text',
  personal: 'bg-cat-personal-bg text-cat-personal-text',
  urgent: 'bg-cat-urgent-bg text-cat-urgent-text',
  ideas: 'bg-cat-ideas-bg text-cat-ideas-text',
  none: 'bg-cat-none-bg text-cat-none-text',
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const category = CATEGORIES.find((c) => c.id === task.category) ?? CATEGORIES[0]

  return (
    <div className="group mb-3 break-inside-avoid rounded-card border border-border bg-card p-4 shadow-card transition-colors hover:border-border-light">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(task.id, !task.done)}
          aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
          className={`mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full border-2 transition-colors ${
            task.done ? 'border-accent bg-accent' : 'border-ink-faint hover:border-ink-dim'
          }`}
        >
          {task.done && (
            <svg width="18" height="18" viewBox="0 0 18 18" className="text-base">
              <path
                d="M4.5 9.5L7.2 12.2L13.5 5.8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </button>

        <p
          className={`flex-1 whitespace-pre-wrap text-[14.5px] leading-relaxed ${
            task.done ? 'text-ink-faint line-through' : 'text-ink'
          }`}
        >
          {task.title}
        </p>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="shrink-0 rounded-full p-1 text-ink-faint opacity-0 transition-opacity hover:text-accent group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.5 9.5h6L11.5 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {task.category !== 'none' && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11.5px] font-medium ${CAT_STYLES[task.category]}`}
          >
            <span aria-hidden="true" className="text-[12px] leading-none">
              {category.icon}
            </span>
            {category.label}
          </span>
        </div>
      )}
    </div>
  )
}
