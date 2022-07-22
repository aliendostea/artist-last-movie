import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { search: "" };
const initialArtistsState = {
  artists: [],
  artistSelected: {},
  artistImgSelected: [],
};
const initialPagesState = { page: 1, totalPages: 0, totalResults: 0 };
const initialStateButtonFilter = {
  moreLikes: false,
  alphabet: false,
  males: false,
  females: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuerySearch(state, action) {
      state.search = action.payload.search;
    },
  },
});

const artistsSlice = createSlice({
  name: "artists",
  initialState: initialArtistsState,
  reducers: {
    setArtists(state, action) {
      state.artists = action.payload.artists;
    },
    setArtistDetails(state, action) {
      state.artistSelected = action.payload;
    },
    setArtistSelected(state, action) {
      const [selected] = state.artists.filter(
        (artist) => artist.id === action.payload
      );
      state.artistSelected = selected;
    },
    setArtistImgSelected(state, action) {
      state.artistImgSelected = action.payload;
    },

    getArtists(state) {
      return state;
    },
    addArtistsToArray(state, action) {
      state.artists = [...state.artists, ...action.payload.artists];
    },
    setArtistLikes(state, action) {
      const likedArtist = action.payload;
      const [stateArtist] = state.artists.filter(
        (element) => element.id === likedArtist.id
      );

      if (likedArtist.liked === undefined) {
        let sumLikes =
          parseInt(stateArtist.popularity.toString().split(".").join("")) + 1;
        stateArtist.popularity = sumLikes
          .toLocaleString("en-US")
          .split(",")
          .join(".");
        stateArtist["liked"] = true;

        return;
      }

      if (likedArtist.liked === true) {
        let sumLikes =
          parseInt(stateArtist.popularity.toString().split(".").join("")) - 1;

        stateArtist.popularity = sumLikes
          .toLocaleString("en-US")
          .split(",")
          .join(".");
        stateArtist["liked"] = false;

        return;
      }

      if (likedArtist.liked === false) {
        let sumLikes =
          parseInt(stateArtist.popularity.toString().split(".").join("")) + 1;

        stateArtist.popularity = sumLikes
          .toLocaleString("en-US")
          .split(",")
          .join(".");
        stateArtist["liked"] = true;
      }
    },
  },
});

const pagesSlice = createSlice({
  name: "pages",
  initialState: initialPagesState,
  reducers: {
    setCurrentPage(state, action) {
      state.totalPages = action.payload.totalPages;
      state.totalResults = action.payload.totalResults;
    },
    increasePageNumber(state) {
      state.page = state.page + 1;
    },
  },
});

const filtersButtonSlice = createSlice({
  name: "filtersButton",
  initialState: initialStateButtonFilter,
  reducers: {
    setMoreLikes(state, action) {
      state.moreLikes = !state.moreLikes;
      state.alphabet = false;
      state.males = false;
      state.females = false;
    },
    setAlphabet(state) {
      state.moreLikes = false;
      state.alphabet = !state.alphabet;
      state.males = false;
      state.females = false;
    },
    setMales(state) {
      state.moreLikes = false;
      state.alphabet = false;
      state.males = !state.males;
      state.females = false;
    },
    setFemales(state) {
      state.moreLikes = false;
      state.alphabet = false;
      state.males = false;
      state.females = !state.females;
    },
  },
});

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    artists: artistsSlice.reducer,
    pages: pagesSlice.reducer,
    filterButton: filtersButtonSlice.reducer,
  },
});

export const searchActions = searchSlice.actions;
export const artistsActions = artistsSlice.actions;
export const pageActions = pagesSlice.actions;
export const filterButtonActions = filtersButtonSlice.actions;

export default store;
