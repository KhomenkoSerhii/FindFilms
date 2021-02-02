import { GENRES_API, MAIN_URL } from "../constants";

export const searchMoviesByInput = async (stateGenre, page) => {
  const url = `${MAIN_URL}&with_genres=${stateGenre}&results=10&page=${page}`;

  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getGenres = async () => {
  const url = `${GENRES_API}`;

  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
  }
};
