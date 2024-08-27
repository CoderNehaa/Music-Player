import axios from "axios";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api_url from "@/config";

const INITIAL_STATE = {
  music: [],
  playlists:[]
};

export const getMusic = createAsyncThunk("getMusic", async (arg, thunkAPI) => {
  try {
    const {data} = await axios.get(`${api_url}/music/all`);
    if(data.success){
      thunkAPI.dispatch(setMusic(data.data));
    } else {
        toast.info(data.message);
    }
  } catch (e) {
    console.log(e);
    toast.error("Failed to load library! Try later.");
  }
});

export const addMusic = createAsyncThunk("getMusic", async (song, thunkAPI) => {
  try {
    const {data} = await axios.post(`${api_url}/music/songs/add`, {...song});
    if(data.success){
      toast.success(data.message);
    } else {
      toast.info(data.message);
    }
  } catch (e) {
    console.log(e);
    toast.error("Failed to add song! Try later.");
  }
});

export const getUserPlaylists = createAsyncThunk(
  "getUserPlaylists",
  async (arg, thunkAPI) => {
    try{
      const {user} = thunkAPI.getState().userReducer;
      const {data} = await axios.get(`http://localhost:3200/music/playlist/${user.id}`);
      if(data.success){
        thunkAPI.dispatch(setPlaylists(data.data));
      } else {
        toast.info(data.message);
      }
    } catch (e){
      console.log(e);
      toast.error("Failed to add in playlist! Try later.")
    }
  }
)

export const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async (playlistName, thunkAPI) => {
    try{
      const {playlists} = thunkAPI.getState().musicReducer;
      const {user} = thunkAPI.getState().userReducer;

      const {data} = await axios.post(`http://localhost:3200/music/playlist/add/${user.id}`, {playlistName});
      if(data.success){
        thunkAPI.dispatch(setPlaylists([data.data, playlists]));
        toast.success(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (e){
      console.log(e);
      toast.error("Failed to create playlist! Try later")
    }
  }
)

export const addSongToPlaylist = createAsyncThunk(
  "addSongToPlaylist",
  async ({song, playlistId}, thunkAPI) => {
    try{
      const {user}= thunkAPI.getState().userReducer;
      const {data} = await axios.post(`http://localhost:3200/music/playlist/${playlistId}/songs/add`, {...song});
      if(data.success){
        toast.success(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (e){
      console.log(e);
      toast.error("Failed to add in playlist! Try later.")
    }
  }
)

export const removeSongFromPlaylist = createAsyncThunk(
  "removeSongFromPlaylist",
  async (song, thunkAPI) => {
    try{
      const {user}= thunkAPI.getState().userReducer;
      const {data} = await axios.post(`http://localhost:3200/music/playlist/${playlistId}/songs/remove`, {...song});
      if(data.success){
        toast.success(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (e){
      console.log(e);
      toast.error("Failed to remove from playlist! Try later.")
    }
  }
)

const musicSlice = createSlice({
  name: "musicSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setMusic: (state, action) => {
      state.music = action.payload;
    },
    setPlaylists:(state, action) => {
      state.playlists = action.payload;
    }
  },
});

export const musicReducer = musicSlice.reducer;
const { setMusic, setPlaylists } = musicSlice.actions;
