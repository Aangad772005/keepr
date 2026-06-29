import { useRef, useState } from 'react'
import { CategoryPicker } from './CategoryPicker'
import type { CategoryId } from '../types'

interface ComposerProps {
  onAdd: (title: string, category: CategoryId) => void
}

export function Composer({ onAdd }: ComposerProps) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<CategoryId>('none')
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (!text.trim()) return
    onAdd(text, category)
    setText('')
    setCategory('none')
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className={`mx-auto w-full max-w-xl rounded-card border bg-card px-4 pt-3.5 pb-3 shadow-card transition-colors ${
        focused ? 'border-accent/70' : 'border-border'
      }`}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Take a note…"
        rows={text ? Math.min(6, Math.max(1, text.split('\n').length)) : 1}
        className="w-full resize-none bg-transparent font-body text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-none"
      />

      <div className="mt-3 flex items-center justify-between">
        <CategoryPicker value={category} onChange={setCategory} />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="rounded-pill bg-accent px-4 py-1.5 text-[13.5px] font-semibold text-base disabled:cursor-not-allowed disabled:bg-card-hover disabled:text-ink-faint"
        >
          Add
        </button>
      </div>
    </div>
  )
}
