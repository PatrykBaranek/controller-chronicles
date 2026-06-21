export interface IgdbCoverImage {
  id: number;
  image_id: string;
}

export interface IgdbNamedEntity {
  id: number;
  name: string;
  slug: string;
}

export interface IgdbWebsite {
  id: number;
  url: string;
  category: number;
}

export interface IgdbInvolvedCompany {
  id: number;
  company: IgdbNamedEntity;
  developer: boolean;
  publisher: boolean;
}

export interface IgdbGameResponse {
  id: number;
  slug: string;
  name: string;
  summary?: string;
  first_release_date?: number;
  aggregated_rating?: number;
  cover?: IgdbCoverImage;
  screenshots?: IgdbCoverImage[];
  websites?: IgdbWebsite[];
  genres?: IgdbNamedEntity[];
  platforms?: IgdbNamedEntity[];
  involved_companies?: IgdbInvolvedCompany[];
}
