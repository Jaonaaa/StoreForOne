import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

export const capitalizeFirstLetter = (text: string): string => (text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text);

export function throttle(func: Function, limit: number) {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

export const randomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getDecimalStr = (num: number): string => {
  return String(Math.abs(num % 1).toFixed(2)).split(".")[1];
};
