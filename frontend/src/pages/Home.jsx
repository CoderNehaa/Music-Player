import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/auth');
    }
  } ,[user]);

  return (
    <div>Home</div>
  )
}

export default Home

