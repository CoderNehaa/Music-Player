import { CustomError } from "../utils/custom.error.js";
import SongModel from "../models/song.model.js";

export class MusicController{
    async getMusic(req, res, next){
        try{
            const songs = await SongModel.find();
            return res.status(200).send({
                success:true,
                data:songs
            })
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    async addSong(req, res, next){
        try {
            const {title, audio } = req.body;
            let songExist = await SongModel.findOne({title});
            if (songExist) {
                throw new CustomError(200, "Title already exists");
            }

            const song = new SongModel({ title, audio });
            const newSong = await song.save();  
            return res.status(201).send({
                success: true,
                message: "Song added successfully",
                data: newSong
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async getUserPlaylists(req, res, next){
        try{
            const {userId} = req.params;
            // in playlists collection, fetch all documents of playlists collection 
            // where document's userId = this params given userId, return fetched playlists  
            return res.success(200).send({
                success:true,
                data:[]
            })
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    async createPlaylist(req, res, next){
        try{
            const {userId} = req.params;
            const {playlistName} = req.body;
            // in playlists collection, add new document with this userId and playlist Name 
            //this api should returns newly created document/playlist
            const newPlaylist = {};
            return res.success(200).send({
                success:true,
                message:"",
                data:newPlaylist
            })
        } catch (e){
            console.log(e);
            next(e);
        }
    }   

    async addSongToPlaylist(req, res, next){
        try{
            const {playlistId} = req.params;
            const {song} = req.body;
            //convert playlistId to mongoose object id
            // in playlists collection, where document's id matches with playlistIdObj
            // push this song to the songs array field of that document
            return res.success(200).send({
                success:true,
                message:""
            })
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    async removeSongFromPlaylist(req, res, next){
        try{
            const {playlistId} = req.params;
            const {song} = req.body;
            //  convert playlistId to mongoose object id
            //  in playlists collection, where document's id matches with playlistIdObj
            //  remove this song from the songs array field of that document
            return res.success(200).send({
                success:true,
                message:""
            })
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    async addToFavorite(req, res, next){

    }

    async removeFromFavorite(){
        
    }
}
