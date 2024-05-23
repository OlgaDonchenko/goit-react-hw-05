import axios from "axios";

const AccessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTZiYjA2ZDAzYjQzZTU2ZjlmYjkwMDJkOWU4Njk2MiIsInN1YiI6IjY2NDMzMjk3MjY5NDdiZGZkYmI4YTEwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bv9SwyR92LZ0Z9kXRGoU3HO3gt8lKdGLE-MYfCrf5_s";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },
});

export const getTrendMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    throw error;
  }
};

export const getMovieDetailsById = async (id) => {
  try {
    const response = await api.get(`/movie/${id}?language=en-US`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error.message);
    throw error;
  }
};

export const getMovieCastById = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits?language=en-US`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching cast for movie ID ${id}:`, error.message);
    throw error;
  }
};

export const getMovieReviewsById = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/reviews?language=en-US`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${id}:`, error.message);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    );
    const results = response.data.results;
    if (!Array.isArray(results)) {
      throw new Error("Invalid data structure");
    }
    return response.data; // Повертаємо повний об'єкт data
  } catch (error) {
    console.error(
      `Error searching movies with query "${query}":`,
      error.message
    );
    throw error;
  }
};
