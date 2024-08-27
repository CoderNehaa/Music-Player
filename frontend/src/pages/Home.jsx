import MusicCard from "@/components/custom/MusicCard";
import { getMusic } from "@/redux/reducers/musicReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.userReducer);
  const music = useSelector((state) => state.musicReducer.music);
  const [loadMusic, setLoadMusic] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchData() {
    await dispatch(getMusic());
    setLoadMusic(false);
  }

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      setLoadMusic(true);
    }
  }, [user]);

  useEffect(() => {
    if (loadMusic && user) {
      fetchData();
    }
  }, [loadMusic]);

  return (
    <div className="h-full w-full mt-16">
      <div className="h-full w-1/2 m-auto">
        <h1 className="text-start tracking-wide text-4xl font-semibold py-5">
          Music Library
        </h1>
        <div>
          {music && music.length
            ? music.map((song, index) => <MusicCard key={index} song={song} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

