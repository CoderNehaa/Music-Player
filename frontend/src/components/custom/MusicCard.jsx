import React from 'react'
import { addToFavorite, removeFavorite } from '@/redux/reducers/userReducer';
import { BsHeart, BsHeartFill, BsPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

const MusicCard = ({song}) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  function handleFavoriteClick(){
    if(song.isFavorite){
      dispatch(removeFavorite({userId:user.id, songId:song.id}));
    } else {
      dispatch(addToFavorite({userId:user.id, songId:song.id}));
    }
  }

  return (
    <div className='relative shadow-sm border-2 dark:shadow-md dark:shadow-slate-800 m-4 p-4 flex justify-between'>
      <div className='flex flex-col'>
        <span className='text-lg font-semibold capitalize'> {song.title}</span>
        <span>{song.singer}</span>
      </div>
      <div className='flex items-center'>

        <span className='mr-3 text-xl' onClick={handleFavoriteClick}>{song.isFavorite?<BsHeartFill />:<BsHeart />}</span>
        <span className='mr-3 text-2xl'><BsPlus /></span>
        <image href={song.image} height={20} width={20} />
      </div>  
    </div>
  )
}

export default MusicCard
