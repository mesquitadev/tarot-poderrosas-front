// ...existing code...
// utils/tw.ts
import { twMerge } from 'tailwind-merge';

export function tw(...inputs: (string | undefined | false | null)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}
// ...existing code...
