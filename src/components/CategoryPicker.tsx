import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, type CategoryId } from '../types'

interface CategoryPickerProps {
  value: CategoryId
  onChange: (id: CategoryId) => void
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = CATEGORIES.find((c) => c.id === value) ?? CATEGORIES[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-[13px] font-medium transition-colors
          ${
            value !== 'none'
              ? 'border-border-light bg-card-hover text-ink'
              : 'border-border bg-transparent text-ink-dim hover:bg-card-hover hover:text-ink'
          }`}
      >
        <span aria-hidden="true" className="text-[14px] leading-none">
          {selected.icon}
        </span>
        <span>{selected.id === 'none' ? 'Category' : selected.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute bottom-full left-0 z-20 mb-2 w-52 overflow-hidden rounded-2xl border border-border-light bg-card shadow-popover"
        >
          <ul className="py-1.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={cat.id === value}
                  onClick={() => {
                    onChange(cat.id)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[13.5px] text-ink hover:bg-card-hover"
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="text-[15px] leading-none">
                      {cat.icon}
                    </span>
                    {cat.label}
                  </span>
                  {cat.id === value && (
                    <svg width="14" height="14" viewBox="0 0 16 16" className="text-accent">
                      <path
                        d="M3 8.5L6.2 11.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
