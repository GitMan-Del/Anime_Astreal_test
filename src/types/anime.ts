export type JikanRawAnime = {
  mal_id: number;
  title: string;
  score: number | null;
  images: {
    jpg: {
      image_url: string;    
      small_image_url: string;
      large_image_url: string;
    };
    webp?: {
      image_url?: string;
    };
  };
};

export type Anime = {
  id: number;
  title: string;
  cover: string;
  cover_small: string
  cover_large: string
  rating: number;
};
