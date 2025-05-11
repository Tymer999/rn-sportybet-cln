import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://matches-api-t-tymer5911-f94my4zf.leapcell.dev/"; // Replace with your local IP address
const MATCHES_STORAGE_KEY = "@sportybet_matches";

interface LiveMatch {
  homeTeam: string;
  homeScore: string;
  awayTeam: string;
  awayScore: string;
  eventTime: string;
  league: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  matchStatus: string;
  marketSize: string;
  stv: boolean;
  isHot: boolean;
}
interface FeaturedMatch {
  id: string;
  league: string;
  homeName: string;
  awayName: string;
  homeScore: string;
  awayScore: string;
  time: string;
  date: string;
  status: "live" | "upcoming" | "finished";
  marketSize: string;
  stv: boolean;
  outcome: Array<{
    desc: string;
    odds: string;
    pick: string;
  }>;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  score: string,
  eventTime: string,
  matchStatus: string
}

interface Category {
  leagueName: string;
  leagueIcon: any;
}

export interface Matches {
  live: LiveMatch[];
  featured: FeaturedMatch[];
  categories: Category[];
}

const saveMatchesToStorage = async (matches: Matches) => {
  try {
    await AsyncStorage.setItem(
      MATCHES_STORAGE_KEY,
      JSON.stringify({
        data: matches,
        timestamp: new Date().getTime(),
      })
    );
  } catch (error) {
    // console.error('Failed to save matches to storage:', error);
  }
};

const getMatchesFromStorage = async (): Promise<Matches | null> => {
  try {
    const stored = await AsyncStorage.getItem(MATCHES_STORAGE_KEY);
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    const isExpired = new Date().getTime() - timestamp > 30 * 60 * 1000; // 30 minutes

    return isExpired ? null : data;
  } catch (error) {
    console.error("Failed to get matches from storage:", error);
    return null;
  }
};

export const getMatches = async () => {
  try {
    // Try to get fresh data from API
    const response = await axios.get(`${API_URL}`);
    const newData = response.data;

    // If we got valid data, save it and return
    if (
      newData?.live?.length ||
      newData?.featured?.length ||
      newData?.categories?.length
    ) {
      await saveMatchesToStorage(newData);
      return newData;
    }

    // If no valid data from API, try to get from storage
    const storedData = await getMatchesFromStorage();
    if (storedData) {
      // console.log('Using cached matches data');
      return storedData;
    }

    // If no stored data either, return empty state
    return {
      live: [],
      featured: [],
      categories: [],
    };
  } catch (error) {
    // console.error('Failed to fetch live matches:', error);

    // On API error, try to get from storage
    const storedData = await getMatchesFromStorage();
    if (storedData) {
      // console.log('Using cached matches data after API error');
      return storedData;
    }

    // If no stored data, return empty state
    return {
      live: [],
      featured: [],
      categories: [],
    };
  }
};
