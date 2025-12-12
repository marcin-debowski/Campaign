import type { Campaign } from "../type";

export const AVAILABLE_TOWNS: string[] = [
  "Warszawa",
  "Kraków",
  "Wrocław",
  "Poznań",
  "Gdańsk",
  "Łódź",
  "Szczecin",
  "Bydgoszcz",
];

export const SUGGESTED_KEYWORDS: string[] = [
  "fashion",
  "tech",
  "organic",
  "sale",
  "luxury",
  "home",
  "garden",
  "toys",
  "automotive",
  "beauty",
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: "Summer Sale 2024",
    keywords: ["fashion", "sale"],
    bidAmount: 15,
    fund: 1000,
    status: true,
    town: "Kraków",
    radius: 10,
  },
];

export const INITIAL_BALANCE = 10000;
