import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Env vars (set in Vercel project settings)                          */
/* ------------------------------------------------------------------ */

const CLIENT_ID     = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

/* ------------------------------------------------------------------ */
/*  Strava API types                                                   */
/* ------------------------------------------------------------------ */

interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;        // meters
  moving_time: number;     // seconds
  start_date_local: string;
  kudos_count: number;
}

/* ------------------------------------------------------------------ */
/*  Fallback data (matches lib/strava.ts)                              */
/* ------------------------------------------------------------------ */

const FALLBACK_ACTIVITIES = [
  { id: "1", type: "run", title: "Morning Run — Parc de la Tête d'Or", distance: "8.2 km", time: "42:15", pace: "5:09 /km", date: "Today", kudos: 14, routeIndex: 0 },
  { id: "2", type: "run", title: "Easy Recovery Run", distance: "5.1 km", time: "28:30", pace: "5:35 /km", date: "Yesterday", kudos: 8, routeIndex: 1 },
  { id: "3", type: "run", title: "Tempo Run — Berges du Rhône", distance: "10.0 km", time: "48:20", pace: "4:50 /km", date: "May 17", kudos: 21, routeIndex: 2 },
  { id: "4", type: "run", title: "Long Run Sunday", distance: "15.3 km", time: "1:18:45", pace: "5:09 /km", date: "May 16", kudos: 33, routeIndex: 3 },
  { id: "5", type: "run", title: "Lunch Run", distance: "6.0 km", time: "32:00", pace: "5:20 /km", date: "May 15", kudos: 6, routeIndex: 4 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDistance(meters: number): string {
  return (meters / 1000).toFixed(1) + " km";
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatPace(meters: number, seconds: number): string {
  if (meters === 0) return "—";
  const paceSecondsPerKm = seconds / (meters / 1000);
  const paceMin = Math.floor(paceSecondsPerKm / 60);
  const paceSec = Math.round(paceSecondsPerKm % 60);
  return `${paceMin}:${String(paceSec).padStart(2, "0")} /km`;
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function mapType(stravaType: string): "run" | "ride" | "hike" {
  const t = stravaType.toLowerCase();
  if (t.includes("ride") || t.includes("cycle")) return "ride";
  if (t.includes("hike") || t.includes("walk")) return "hike";
  return "run";
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function GET() {
  // If env vars are missing, return fallback immediately
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(
      { fallback: true, activities: FALLBACK_ACTIVITIES },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  }

  try {
    // 1. Refresh the access token
    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenRes.ok) throw new Error(`Token refresh failed: ${tokenRes.status}`);
    const tokenData = (await tokenRes.json()) as StravaTokenResponse;

    // 2. Fetch latest activities
    const activitiesRes = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=10",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    if (!activitiesRes.ok) throw new Error(`Activities fetch failed: ${activitiesRes.status}`);
    const raw = (await activitiesRes.json()) as StravaActivity[];

    // 3. Map to our Activity interface
    const activities = raw.map((a, i) => ({
      id: String(a.id),
      type: mapType(a.type),
      title: a.name,
      distance: formatDistance(a.distance),
      time: formatTime(a.moving_time),
      pace: formatPace(a.distance, a.moving_time),
      date: formatDate(a.start_date_local),
      kudos: a.kudos_count,
      routeIndex: i % 5,
    }));

    return NextResponse.json(
      { fallback: false, activities },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (err) {
    console.error("[Strava API]", err);
    return NextResponse.json(
      { fallback: true, activities: FALLBACK_ACTIVITIES },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  }
}
