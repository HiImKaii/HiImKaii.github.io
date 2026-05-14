"use client";

import { useEffect, useState } from "react";

interface GitHubStats {
  repos: number;
  followers: number;
  contributions: number;
}

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats>({ repos: 7, followers: 2, contributions: 91 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) return;
        const data = await res.json();

        const newStats: GitHubStats = {
          repos: data.public_repos || 7,
          followers: data.followers || 2,
          contributions: 91,
        };

        const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          const pushEvents = events.filter((e: { type: string }) => e.type === "PushEvent");
          let totalCommits = 0;
          pushEvents.forEach((e: { payload: { commits?: unknown[] } }) => {
            totalCommits += e.payload.commits ? e.payload.commits.length : 0;
          });
          if (totalCommits > 0) newStats.contributions = totalCommits;
        }

        setStats(newStats);
      } catch {
        // Silently fail
      }
    }

    fetchStats();
  }, [username]);

  return stats;
}
