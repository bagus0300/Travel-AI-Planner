import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDisplayName = (
  firstName: string | undefined,
  lastName: string | undefined,
  email: string
) => {
  if (!firstName) return email;
  return firstName + (lastName ? ` ${lastName}` : "") + ` (${email})`;
};