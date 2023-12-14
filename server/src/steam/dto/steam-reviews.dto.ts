
export class SteamReviewsDto {  
  reviewsSummaryFrom30Days?: {
    usersCount: number;
    textSummary: string;
    positivePercentage: number;
  };

  reviewsSummaryOverall?: {
    usersCount: number;
    textSummary: string;
    positivePercentage: number;
  };
}