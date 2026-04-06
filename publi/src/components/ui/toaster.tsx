"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

function Toaster() {
  const { dismiss, toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          open
          onOpenChange={(open) => {
            if (!open) {
              dismiss(toast.id)
            }
          }}
        >
          {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
          {toast.description ? (
            <ToastDescription className={toast.title ? "mt-1" : ""}>
              {toast.description}
            </ToastDescription>
          ) : null}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export { Toaster }
