export interface LeaderboardResult {
  place: number;
  email: string;
  points: number;
  user_id: number;
}

export interface LeaderboardData {
  leaderboard: LeaderboardResult[];
  leaderboard_count: number;
}
