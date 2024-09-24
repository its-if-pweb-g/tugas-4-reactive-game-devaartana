import { writable } from "svelte/store"

export type AlertType = 'DANGER' | 'INFO' | 'SUCCESS'
export const ALERT_TYPES: Record<AlertType, AlertType> = {
  DANGER: 'DANGER',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS'
}
export const alertMessage = writable<string>('')
export const alertType = writable<AlertType>(ALERT_TYPES.INFO)

export const displayAlert = (message: string, type: AlertType = ALERT_TYPES.INFO, resetTime?: number): void => {
  alertMessage.set(message)
  alertType.set(type)
  
  if (resetTime) {
    setTimeout(() => {
      alertMessage.set('')
    }, resetTime)
  }
}
