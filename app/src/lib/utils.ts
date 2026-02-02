import { differenceInMonths, differenceInYears, parse, startOfYear, addYears } from "date-fns";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate the countdown until funds become accessible.
 * Growth period ends Jan 1 of the year the child turns 18.
 */
export function calculateCountdown(dob: string): {
  years: number;
  months: number;
  accessDate: Date;
  isPast: boolean;
} {
  const birthDate = new Date(dob);
  const accessDate = startOfYear(addYears(birthDate, 18));
  const now = new Date();

  if (now >= accessDate) {
    return { years: 0, months: 0, accessDate, isPast: true };
  }

  const years = differenceInYears(accessDate, now);
  const months = differenceInMonths(accessDate, now) % 12;

  return { years, months, accessDate, isPast: false };
}

export function generatePin(lastName: string): string {
  const alpha = lastName.charAt(0).toUpperCase();
  const numeric = Math.floor(100000 + Math.random() * 900000).toString();
  return `${alpha}${numeric}`;
}

export function getContributionCapacity(
  totalContributed: number,
  annualLimit: number = 5000
): number {
  return Math.max(0, annualLimit - totalContributed);
}

export function getCohortYear(enrollmentDate: Date = new Date()): number {
  return enrollmentDate.getFullYear();
}
