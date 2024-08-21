import express from "express";
import { MusicController } from "../controllers/music.controller.js";

const musicRouter = express.Router();
const musicController = new MusicController();

musicRouter.get("/all", musicController.getMusic);
musicRouter.get("/playlist/:userId", musicController.getUserPlaylists);
musicRouter.post("/playlist/add/:userId", musicController.createPlaylist);
musicRouter.post("/playlist/:playlistId/songs/add", musicController.addSongToPlaylist);
musicRouter.post("/playlist/:playlistId/songs/remove", musicController.removeSongFromPlaylist);

export default musicRouter;

