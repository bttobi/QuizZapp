export interface UserData {
  readonly email: string;
  readonly userID: number;
  readonly token: string;
}

export interface UserRanking {
  place: number;
  points: number;
}

export interface UserAuth {
  readonly email: string;
  readonly password: string;
}
