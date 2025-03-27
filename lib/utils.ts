import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn (...inputs: ClassValue[])
{
  return twMerge(clsx(inputs));
}

export function toPascalCase (str: string): string
{
  return str
    .replace(/_([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, char => char.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function countWords (s: string): number
{
  return String(s).trim().split(/\s+/).length;
}
