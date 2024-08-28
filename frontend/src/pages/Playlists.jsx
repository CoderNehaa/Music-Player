import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist, getUserPlaylists } from "@/redux/reducers/musicReducer";
import { DialogClose } from "@radix-ui/react-dialog";

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.userReducer);

  useEffect(() => {
    if(user){
      dispatch(getUserPlaylists());
    }
  }, [user]);

  async function handleSubmit() {
    await dispatch(createPlaylist(playlistName));
    setPlaylistName("");
  }

  return (
    <div className="h-auto w-full mt-16">
      <div className="h-auto w-3/5 m-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-start tracking-wide text-4xl font-semibold py-5">
            Your Playlists
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Create New <i className="fa-solid fa-plus ml-2"></i>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Playlist Name
                  </Label>
                  <Input
                    id="name"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter Playlist Name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                <Button onClick={handleSubmit} type="submit">
                  Create
                </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
