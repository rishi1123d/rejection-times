import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatdate (dateFormat: string = Date.now().toString()) {
return new Date(dateFormat).toLocaleDateString('en-US', { 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric' 
})
}