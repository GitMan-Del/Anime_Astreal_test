export type JikanRawAnime = {
  mal_id: number;
  title: string;
  type: string
  genres?: { name: string }[];
  year: number | null;
  score: number | null;
  rating: string | null;
  synopsis: string | null;
  images: {
    jpg: {
      image_url: string;    
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
          image_url: string
          small_image_url: string
          large_image_url: string
      }
  };
};

export type Anime = {
  id: number;
  synopsis: string | null;
  genres?: { name: string }[];
  type: string
  year: number | null
  title: string;
  cover: string;
  webp_small: string
  webp_image_url: string
  webp_large: string
  cover_small: string
  cover_large: string
  score: number;
  rating: string | null;
};
