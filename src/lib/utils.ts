import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractWords(input: string, keyword: string): string {
  // input içinde keyword'ü arayıp geri döndüren bir fonksiyon
  // Örnek bir implementasyon:
  const index = input.indexOf(keyword);
  if (index !== -1) {
    return input.substring(index + keyword.length, input.indexOf(";", index));
  }
  return "";
}

export function capitalizeWords(str:string) {
  return str.replace(/\w\S*/g, function(word) {
    return word[0].toUpperCase() + word.slice(1);
  });
}

