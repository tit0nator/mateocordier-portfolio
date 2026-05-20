"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const USERNAME = "titonatorr";
const PROFILE_URL = `https://www.chess.com/member/${USERNAME}`;
const API_URL = `https://api.chess.com/pub/player/${USERNAME}/stats`;
const CHESS_GREEN = "#769656";

interface ChessRecord { win: number; loss: number; draw: number }
interface ChessMode  { last?: { rating: number }; best?: { rating: number }; record?: ChessRecord }
interface ChessStats {
  chess_rapid?:  ChessMode;
  chess_blitz?:  ChessMode;
  chess_bullet?: ChessMode;
  tactics?:      { highest?: { rating: number } };
}

const FALLBACK: ChessStats = {
  chess_rapid:  { last: { rating: 892  }, best: { rating: 930  }, record: { win: 47,  loss: 52, draw: 8  } },
  chess_blitz:  { last: { rating: 756  }, best: { rating: 820  }, record: { win: 120, loss: 135, draw: 14 } },
  chess_bullet: { last: { rating: 612  }, best: { rating: 650  }, record: { win: 38,  loss: 45, draw: 3  } },
  tactics:      { highest: { rating: 1240 } },
};

function WLDBar({ record }: { record: ChessRecord }) {
  const total = record.win + record.loss + record.draw || 1;
  const wPct  = (record.win  / total) * 100;
  const lPct  = (record.loss / total) * 100;
  const dPct  = (record.draw / total) * 100;
  return (
    <div className="flex w-full overflow-hidden rounded-full" style={{ height: 4 }}>
      <div style={{ width: `${wPct}%`, background: CHESS_GREEN }} />
      <div style={{ width: `${lPct}%`, background: "#c62828" }} />
      <div style={{ width: `${dPct}%`, background: "#616161" }} />
    </div>
  );
}

function StatCard({
  label, rating, best, record,
}: { label: string; rating?: number; best?: number; record?: ChessRecord }) {
  const t = useTranslations("apps.chess.stats");
  return (
    <div className="flex flex-col gap-1.5 rounded-xl p-3.5" style={{ background: "#1e2122" }}>
      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#8e9491" }}>{label}</p>
      <p className="text-[26px] font-bold leading-none tracking-tight text-white">{rating ?? "—"}</p>
      {best && best !== rating && (
        <p className="text-[9.5px] font-medium" style={{ color: CHESS_GREEN }}>Best: {best}</p>
      )}
      {record && (
        <>
          <WLDBar record={record} />
          <div className="flex gap-2 text-[9.5px] font-medium">
            <span style={{ color: CHESS_GREEN }}>{t("wins")} {record.win}</span>
            <span style={{ color: "#c62828" }}>{t("losses")} {record.loss}</span>
            <span style={{ color: "#616161" }}>{t("draws")} {record.draw}</span>
          </div>
        </>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 px-3.5">
      {[0,1,2,3].map((i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl" style={{ background: "#1e2122" }} />
      ))}
    </div>
  );
}

export function Chess(_: { windowId: string }) {
  const t = useTranslations("apps.chess");
  const ts = useTranslations("apps.chess.stats");
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: ChessStats) => { if (!cancelled) { setStats(data); setLoading(false); } })
      .catch(() => { if (!cancelled) { setStats(FALLBACK); setLoading(false); setError(true); } });
    return () => { cancelled = true; };
  }, []);

  const s = stats ?? FALLBACK;

  return (
    <div className="flex h-full flex-col overflow-y-auto" style={{ background: "#262421", color: "#e8e6e3" }}>
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-[18px] font-black text-white shadow-lg"
            style={{ background: CHESS_GREEN }}
          >
            ♞
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold tracking-tight text-white">{USERNAME}</span>
              {!error && !loading && (
                <span className="flex items-center gap-1 rounded-full bg-green-900/30 px-1.5 py-0.5 text-[9px] font-semibold text-green-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>
            <p className="text-[10.5px]" style={{ color: "#8e9491" }}>
              Chess.com
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Stats grid */}
      <div className="flex-1 py-3">
        {loading && !stats ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-2 gap-2.5 px-3.5">
            <StatCard
              label={ts("rapid")}
              rating={s.chess_rapid?.last?.rating}
              best={s.chess_rapid?.best?.rating}
              record={s.chess_rapid?.record}
            />
            <StatCard
              label={ts("blitz")}
              rating={s.chess_blitz?.last?.rating}
              best={s.chess_blitz?.best?.rating}
              record={s.chess_blitz?.record}
            />
            <StatCard
              label={ts("bullet")}
              rating={s.chess_bullet?.last?.rating}
              best={s.chess_bullet?.best?.rating}
              record={s.chess_bullet?.record}
            />
            <StatCard
              label={ts("puzzle")}
              rating={s.tactics?.highest?.rating}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="shrink-0 px-3.5 pb-3.5">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl py-2.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: CHESS_GREEN }}
        >
          {t("cta")} &rarr;
        </a>
      </div>
    </div>
  );
}
