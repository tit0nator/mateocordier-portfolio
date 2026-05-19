export interface Activity {
  id: string;
  type: "run" | "ride" | "hike";
  title: string;
  distance: string;
  time: string;
  pace: string;
  date: string;
  kudos: number;
  routeIndex: number;
}

export const ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "run",
    title: "Morning Run — Parc de la Tête d'Or",
    distance: "8.2 km",
    time: "42:15",
    pace: "5:09 /km",
    date: "Today",
    kudos: 14,
    routeIndex: 0,
  },
  {
    id: "2",
    type: "run",
    title: "Easy Recovery Run",
    distance: "5.1 km",
    time: "28:30",
    pace: "5:35 /km",
    date: "Yesterday",
    kudos: 8,
    routeIndex: 1,
  },
  {
    id: "3",
    type: "run",
    title: "Tempo Run — Berges du Rhône",
    distance: "10.0 km",
    time: "48:20",
    pace: "4:50 /km",
    date: "May 17",
    kudos: 21,
    routeIndex: 2,
  },
  {
    id: "4",
    type: "run",
    title: "Long Run Sunday",
    distance: "15.3 km",
    time: "1:18:45",
    pace: "5:09 /km",
    date: "May 16",
    kudos: 33,
    routeIndex: 3,
  },
  {
    id: "5",
    type: "run",
    title: "Lunch Run",
    distance: "6.0 km",
    time: "32:00",
    pace: "5:20 /km",
    date: "May 15",
    kudos: 6,
    routeIndex: 4,
  },
];
