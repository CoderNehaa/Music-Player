import React from "react";
import { addToFavorite, removeFavorite } from "@/redux/reducers/userReducer";
import { BsHeart, BsHeartFill, BsPlay, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const MusicCard = ({ song }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const isFavorite = () => {
    if(user && user.favorites && user.favorites.length > 0){
      const isPresent = user.favorites.find((obj) => obj.songId === song.id);
      return isPresent;
    } else {
      return false
    }
  }

  function handleFavoriteClick() {
    const isFav = isFavorite();
    if (isFav) {
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
        <iframe
            src={song.audio}
            width="100%"
            height="252"
            frameborder="0"
            title={song.title} 
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

