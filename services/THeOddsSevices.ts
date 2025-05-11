import axios from "axios";

const API_KEY = '02e6a8a8f3885c60e187238db986652f';
const BASE_URL = 'https://api.the-odds-api.com/v4/sports';

interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Array<{
    key: string;
    outcomes: Array<{
      name: string;
      price: number;
    }>;
  }>;
}

interface Match {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface OddsResponse {
  success: boolean;
  data: Match[];
}

export const fetchMatch = async () => {
  try {
    // List of popular soccer leagues
    const leagues = [
      'soccer_epl',           // English Premier League
      'soccer_spain_la_liga', // La Liga
      'soccer_italy_serie_a', // Serie A
      'soccer_germany_bundesliga1', // Bundesliga
      'soccer_france_ligue_one', // Ligue 1
      'soccer_uefa_champs_league' // Champions League
    ];

    // Fetch matches from all leagues in parallel
    const responses = await Promise.all(
      leagues.map(league => 
        axios.get<Match[]>(`${BASE_URL}/${league}/odds`, {
          params: {
            apiKey: API_KEY,
            regions: 'eu',
            markets: 'h2h',
            oddsFormat: 'decimal',
            dateFormat: 'iso'
          }
        })
      )
    );

    // Combine and transform all matches
    const allMatches = responses.flatMap(response => response.data);
    const formattedMatches = allMatches.map(match => ({
      id: match.id,
      homeTeam: match.home_team,
      awayTeam: match.away_team,
      league: match.sport_title,
      startTime: new Date(match.commence_time),
      odds: match.bookmakers.map(bookmaker => ({
        bookmaker: bookmaker.title,
        homeWin: bookmaker.markets[0]?.outcomes.find(o => o.name === match.home_team)?.price,
        draw: bookmaker.markets[0]?.outcomes.find(o => o.name === 'Draw')?.price,
        awayWin: bookmaker.markets[0]?.outcomes.find(o => o.name === match.away_team)?.price,
        lastUpdate: new Date(bookmaker.last_update)
      }))
    }));

    console.log();
    

    return {
      matches: formattedMatches,
      count: formattedMatches.length,
      lastUpdated: new Date()
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
      
      if (error.response?.status === 422) {
        throw new Error('Invalid API parameters');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
    }
    throw error;
  }
};

// Add rate limit tracking
let requestCount = 0;
const DAILY_LIMIT = 500;

export const getRemainingRequests = () => {
  return DAILY_LIMIT - requestCount;
};

// Helper function to get available sports
export const getAvailableSports = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sports:', error);
    throw error;
  }
};

