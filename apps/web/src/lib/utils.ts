import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

// export function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
