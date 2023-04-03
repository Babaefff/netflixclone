import {
  configureStore,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../Utils/constants";

import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  likedMovies: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres, type) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);

      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
        mediaType: type ? type : movie.media_type,
      });
    }
  });
};

const getRawData = async (api, genres, paging, type) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);

    createArrayFromRawData(results, moviesArray, genres, type);
  }

  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );

    //   return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}$with_genres=${gen}`)
  }
);
export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenre",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
      null,
      type
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`https://netflixclone.herokuapp.com/api/user/liked/${email}`);
    return movies;
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ email, movieId }) => {
    console.log(email);
    const {
      data: { movies },
    } = await axios.put(`https://netflixclone.herokuapp.com/api/user/delete`, {
      email,
      movieId,
    });
    return movies;
  }
);

export const addToLiked = createAsyncThunk(
  "netflix/addLiked",
  async ({ email, movieData }, { getState }) => {
    console.log(movieData);
    console.log(email);

    await axios.post(`https://netflixclone.herokuapp.com/api/user/add`, {
      email,
      data: movieData,
    });
    const { likedMovies } = getState().netflix;
    const newLikedMovies = [...likedMovies, movieData];

    console.log(newLikedMovies, "newLikedMovies");
    return newLikedMovies;
  }
);


const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
    builder.addCase(addToLiked.fulfilled, (state, action) => {
      console.log()
      state.likedMovies = action.payload;
    });

    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
