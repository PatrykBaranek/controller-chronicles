import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';

@Injectable()
export class YoutubeService {
  private readonly youtube = google.youtube('v3');

  async getGameVideoReviewByTitle(
    title: string,
    lang?: 'pl' | 'en',
  ): Promise<any> {
    let searchQuery = `${title} `;

    if (lang === 'pl') {
      searchQuery += 'recenzja';
    } else {
      searchQuery += 'review';
    }

    const requestOptions: youtube_v3.Params$Resource$Search$List = {
      key: process.env.YOUTUBE_API_KEY,
      q: searchQuery,
      part: ['snippet'],
      type: ['video'],
      order: 'relevance',
      maxResults: 5,
    };

    const response = await this.youtube.search.list(requestOptions);

    const result = response.data.items.map((item) => {
      return {
        title: item.snippet?.title,
        thumbnail: item.snippet?.thumbnails?.high?.url,
        author: item.snippet?.channelTitle,
        link: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      };
    });

    return {
      video_reviews: result,
    };
  }
}
