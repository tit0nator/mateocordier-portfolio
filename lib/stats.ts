export interface Stat {
  id: string;
  labelKey: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendLabel: string;
  sparkline: number[];
}

export const STATS: Stat[] = [
  {
    id: "portfolioViews",
    labelKey: "portfolioViews",
    value: "1,247",
    trend: "up",
    trendLabel: "+23% this month",
    sparkline: [40, 45, 42, 55, 60, 58, 72, 80],
  },
  {
    id: "projectsShipped",
    labelKey: "projectsShipped",
    value: "12",
    trend: "up",
    trendLabel: "+3 this year",
    sparkline: [5, 6, 7, 8, 9, 9, 11, 12],
  },
  {
    id: "clientSatisfaction",
    labelKey: "clientSatisfaction",
    value: "100%",
    trend: "neutral",
    trendLabel: "steady",
    sparkline: [95, 100, 100, 100, 100, 100, 100, 100],
  },
  {
    id: "linkedinFollowers",
    labelKey: "linkedinFollowers",
    value: "850",
    trend: "up",
    trendLabel: "+12%",
    sparkline: [620, 660, 690, 720, 750, 790, 820, 850],
  },
  {
    id: "githubContributions",
    labelKey: "githubContributions",
    value: "347",
    trend: "up",
    trendLabel: "active",
    sparkline: [200, 220, 240, 270, 290, 310, 330, 347],
  },
  {
    id: "responseTime",
    labelKey: "responseTime",
    value: "< 24h",
    trend: "neutral",
    trendLabel: "steady",
    sparkline: [24, 18, 22, 16, 20, 18, 14, 12],
  },
  {
    id: "maltScore",
    labelKey: "maltScore",
    value: "5.0 / 5",
    trend: "neutral",
    trendLabel: "—",
    sparkline: [4.8, 4.9, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  },
  {
    id: "languages",
    labelKey: "languages",
    value: "FR · EN",
    trend: "neutral",
    trendLabel: "bilingual",
    sparkline: [2, 2, 2, 2, 2, 2, 2, 2],
  },
];
