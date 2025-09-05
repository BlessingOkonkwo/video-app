import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAutoplayUrl = (url: string) =>
  url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
