import { useState, useEffect, useCallback } from "react";
import { getMatches } from "../services/MatchesService";
import type { Matches } from "../services/MatchesService";

export const useMatches = () => {
  const [matches, setMatches] = useState<Matches>({ live: [], featured: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  

  const fetchMatches = useCallback(async () => {
    try {
      const data = await getMatches();
      setMatches(data);
      setLastUpdated(new Date(data.lastUpdated));
      setError(null);      
    } catch (err) {
      setError("Failed to load matches");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMatches();

  }, [fetchMatches]);

  // Auto refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(fetchMatches, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  return { matches, loading, error, lastUpdated, refresh: fetchMatches };
};
