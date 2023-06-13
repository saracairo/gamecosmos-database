export interface Game {
  name: string;
  id: string;
  genres: Array<Genre>;
  released: string;
  background_image: string;
  description: string;
  website: string;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshots>;
  trailers: Array<Trailer>;
  metacritic_url: string;
  metacritic: number;
}

export interface APIResponse<T> {
  // <T> = tipo dinamico, qualsiasi tipo viene passato ad APIResponse, lo restituirà come array:
  results: Array<T>;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  };
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshots {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
