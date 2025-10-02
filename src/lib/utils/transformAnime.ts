import { Anime, JikanRawAnime } from "@/types/anime";

export const transformAnimeData = (raw: JikanRawAnime[]): Anime[] => {
  return raw.map((anime) => ({
    id: anime.mal_id,
    webp_image_url: anime.images.webp.image_url,
    title: anime.title,
    webp_large: anime.images.webp.large_image_url,
    webp_small: anime.images.webp.small_image_url,
    cover: anime.images.jpg.image_url,
    cover_small: anime.images.jpg.small_image_url,
    cover_large:anime.images.jpg.large_image_url,
    rating: anime.score ?? 0,
  }));
};
