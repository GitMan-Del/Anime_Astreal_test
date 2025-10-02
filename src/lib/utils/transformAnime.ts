import { Anime, JikanRawAnime } from "@/types/anime";

export const transformAnimeData = (raw: JikanRawAnime[]): Anime[] => {
  return raw.map((anime) => ({
    id: anime.mal_id,
    title: anime.title,
    cover: anime.images.jpg.image_url,
    cover_small: anime.images.jpg.small_image_url,
    cover_large:anime.images.jpg.large_image_url,
    rating: anime.score ?? 0,
  }));
};
