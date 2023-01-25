import {
  collection,
  getDocs,
  onSnapshot,
  query as querys,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Accounts from "../../components/Accounts";
import Navbar from "../../components/Navbar";
import NoResult from "../../components/NoResult";
import Sidebar from "../../components/Sidebar";
import VideoList from "../../components/VideoList";
import { db } from "../../firebase";

function Search() {
  const { query } = useRouter();
  const [searchUser, setsearchUser] = useState([]);
  const [searchVideo, setsearchVideo] = useState([]);
  const [videos, setvideos] = useState([]);
  const [users, setusers] = useState([]);
  const [showUser, setshowUser] = useState(true);

  useEffect(() => {
    if (showUser) {
      const q = querys(collection(db, "tiktot_users"));

      const userSub = onSnapshot(q, (querySnapshot) => {
        let user = [];
        querySnapshot.forEach((doc) => {
          user.push({ ...doc.data(), id: doc.id });
          setusers(user);
        });
      });

      return () => {
        userSub;
      };
    } else {
      const q = querys(collection(db, "tiktot_posts"));

      const videoSub = onSnapshot(q, (querySnapshot) => {
        let video = [];
        querySnapshot.forEach((doc) => {
          video.push({ ...doc.data(), videoId: doc.id });
          setvideos(video);
        });
      });

      return () => {
        videoSub;
      };
    }
  }, [db, showUser]);

  useEffect(() => {
    if (query && users && videos) {
      setsearchUser(
        users?.filter((user) =>
          user?.username
            ?.toLowerCase()
            ?.includes(query.term.toLocaleLowerCase())
        )
      );

      setsearchVideo(
        videos?.filter((video) =>
          video?.caption
            ?.toLowerCase()
            ?.includes(query.term.toLocaleLowerCase())
        )
      );
    }
  }, [query, users, videos]);

  //   console.log(query);
  //   console.log(users);
  //   console.log(searchUser);
  //   console.log(showUser);
  console.log(videos);
  //   console.log(searchVideo);

  return (
    <div>
      <Navbar />
      <div className="flex gap-2 md:gap-6 lg:gap-10 max-w-7xl mx-auto">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* main */}
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <div className="flex flex-col gap-10 h-full">
            <div className="flex items-center space-x-20 text-gray-500 text-xl border-b py-5">
              <p
                onClick={() => setshowUser(true)}
                className={`ml-14 cursor-pointer ${
                  showUser && `border-b-2 border-black font-bold text-black`
                }`}
              >
                Accounts
              </p>

              <p
                onClick={() => setshowUser(false)}
                className={`ml-14 cursor-pointer ${
                  !showUser && `border-b-2 border-black font-bold text-black`
                }`}
              >
                Videos
              </p>
            </div>

            {showUser ? (
              <>
                {searchUser?.length > 0 ? (
                  <div className="flex flex-col justify-start gap-5 w-full h-full overflow-y-scroll">
                    {searchUser.map((user) => (
                      <Accounts user={user} key={user.id} account />
                    ))}
                  </div>
                ) : (
                  <NoResult text="No results found!" />
                )}
              </>
            ) : (
              <>
                {searchVideo?.length > 0 ? (
                  <div className="flex  flex-wrap justify-start gap-5 w-full h-full overflow-y-scroll pl-5">
                    {searchVideo.map((video) => (
                      <VideoList key={video.videoId} video={video} />
                    ))}
                  </div>
                ) : (
                  <NoResult text="No results found!" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
