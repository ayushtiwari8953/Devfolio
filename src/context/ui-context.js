import { createContext, useContext } from 'react'

export const UIContext = createContext({
  resumeOpen: false,
  openResume: () => {},
  closeResume: () => {},
})

export function useUI() {
  return useContext(UIContext)
}
