import { useState } from 'react'

interface SignInProps {
  onSubmit: (email: string) => Promise<{ error: { message: string } | null }>
}

export function SignIn({ onSubmit }: SignInProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    const { error } = await onSubmit(email.trim())
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-card p-7 shadow-card">
        <h1 className="font-display text-xl font-semibold text-ink">Keepr</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-dim">
          Sign in with your email — we'll send a magic link, no password needed.
        </p>

        {status === 'sent' ? (
          <p className="mt-6 text-[13.5px] text-cat-personal-text">
            Check your inbox for a sign-in link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-pill border border-border bg-base px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-3 w-full rounded-pill bg-accent py-2.5 text-[14px] font-semibold text-base disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send magic link'}
            </button>
            {status === 'error' && (
              <p className="mt-2 text-[12.5px] text-cat-urgent-text">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
