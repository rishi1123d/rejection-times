import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatdate(dateInput?: string | number | Date): string {
  const inputDate = dateInput ? new Date(dateInput) : new Date();
  const today = new Date();

  // Reset today's time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);

  // If the input date is after today, use today's date instead
  const dateToFormat = inputDate > today ? today : inputDate;

  return dateToFormat.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}
