import { useState } from 'react'
import { UIContext } from './ui-context'

export function UIProvider({ children }) {
  const [resumeOpen, setResumeOpen] = useState(false)
  return (
    <UIContext.Provider
      value={{
        resumeOpen,
        openResume: () => setResumeOpen(true),
        closeResume: () => setResumeOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
