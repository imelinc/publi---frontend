"use client"

import * as React from "react"

type ToastItem = {
  id: string
  title?: string
  description?: string
  duration?: number
}

type ToastContextValue = {
  toasts: ToastItem[]
  toast: (payload: Omit<ToastItem, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

function ToastStoreProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ title, description, duration = 2200 }: Omit<ToastItem, "id">) => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { id, title, description, duration }])
      window.setTimeout(() => {
        dismiss(id)
      }, duration)
    },
    [dismiss]
  )

  const value = React.useMemo(
    () => ({
      toasts,
      toast,
      dismiss,
    }),
    [dismiss, toast, toasts]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastStoreProvider")
  }
  return context
}

export { ToastStoreProvider, useToast }
