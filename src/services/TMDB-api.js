import axios from "axios";

const options = {
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTk1MjZiZTM5MWZhYTU1ZWRiN2Y0ODlmN2UwNjA0YSIsIm5iZiI6MTcyOTExNzYzNS4wNDYzODcsInN1YiI6IjY3MGZlM2Q2NmY3NzA3YWY0MGZhM2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g7JV943APwbCCMw-Ds9VKU1mueF2qh7-ChFKZfHBTlo",
  },
};

export const requestMovies = () => {
  return axios.get("/trending/movie/day", options);
};

export const requestMovieById = (movieId) => {
  return axios.get(`/movie/${movieId}`, options);
};

export const requestMovieCast = (movieId) => {
  return axios.get(`/movie/${movieId}/credits`, options);
};

export const requestMovieReviews = (movieId) => {
  return axios.get(`/movie/${movieId}/reviews`, options);
};

export const requestMoviesByQuery = (query) => {
  return axios.get(`search/movie?query=${query}`, options);
};
