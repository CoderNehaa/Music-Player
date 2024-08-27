import React from "react";
import { addToFavorite, removeFavorite } from "@/redux/reducers/userReducer";
import { BsHeart, BsHeartFill, BsPlay, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const MusicCard = ({ song }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const isFavorite = () => {
    if(user && user.favorites && !user.favorites.length){
      const favSongs = [...user.favorites]
    } else {
      return false
    }
  }

  function handleFavoriteClick() {
    if (song.isFavorite) {
      dispatch(removeFavorite({ userId: user.id, songId: song.id }));
    } else {
      dispatch(addToFavorite({ userId: user.id, songId: song.id }));
    }
  }

  function handlePlaylistClick(){

  }

  function handlePlayClick(){
    
  }

  return (
    <div className="relative shadow-sm border-2 dark:shadow-md dark:shadow-slate-800 m-4 p-4 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        {/* <img src={song.image} height={50} width={50} />
        <div className="flex flex-col ml-4">
          <span className="text-lg font-semibold capitalize">
            {" "}
            {song.title}
          </span>
          <span>{song.singer}</span>
        </div> */}
        <iframe
            src="https://audiomack.com/embed/_alxdr/song/paraluman" //src dynamic
            width="100%"
            height="252"
            frameborder="0"
            title="Paraluman" //title dynamic
            className="bg-transparent"
          ></iframe>
      </div>
      <div className="flex items-center p-2">
        <span className="mr-3 text-lg" onClick={handleFavoriteClick}>
          {isFavorite() ? <BsHeartFill /> : <BsHeart />}
        </span>
        <span className="mr-3 text-2xl" onClick={handlePlaylistClick}>
          <BsPlus />
        </span>
        
      </div>
    </div>
  );
};

export default MusicCard;
