import {
  collection,
  doc,
  onSnapshot,
  where,
  query as querys,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";
import { GoVerified } from "react-icons/go";
import VideoList from "../../components/VideoList";
import { useSession } from "next-auth/react";
import NoResult from "../../components/NoResult";
function Profile() {
  const router = useRouter();
  const [user, setUser] = useState();
  const { query } = router;
  const [showVideo, setshowVideo] = useState(true);
  const [videos, setVideos] = useState([]);
  const [likevideo, setLikeVideo] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (query.id) {
      const unsub = onSnapshot(doc(db, "tiktot_users", query.id), (doc) => {
        setUser(doc.data());
      });

      return unsub;
    }
  }, [db, query, session]);

  useEffect(() => {
    if (query.id) {
      if (showVideo === true) {
        setVideos([]);
        const q = querys(
          collection(db, "tiktot_posts"),
          where("uid", "==", query.id),
          orderBy("timestamp", "desc")
        );

        const unVideosubscribe = onSnapshot(q, (querySnapshot) => {
          const video = [];
          querySnapshot.forEach((doc) => {
            video.push({ ...doc.data(), videoId: doc.id });
            setVideos(video);
          });
        });

        return unVideosubscribe;
      } else {
        setVideos([]);
        const collRef = collection(db, "tiktot_likes");

        const q = querys(
          collRef,
          where("userId", "==", query.id),
          orderBy("timestamp", "desc")
        );

        const unLikeUnscribe = onSnapshot(q, (querySnapshot) => {
          const video = [];
          querySnapshot.forEach((doc) => {
            video.push({ ...doc.data() });
            setLikeVideo(video);
          });
        });

        return unLikeUnscribe;
      }
    }
  }, [query.id, showVideo, db]);

  // console.log(user);
  // console.log(showVideo);
  // console.log(videos)

  // console.log(likevideo);
  return (
    <div>
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* main */}
        <div className="mt-4 flex flex-col  overflow-auto h-[88vh] videos flex-1">
          <div className="flex flex-col h-full w-full">
            {/* top */}
            <div className="space-y-10">
              <div className="flex space-x-5 items-center ml-10">
                <img
                  src={user?.userImg}
                  alt=""
                  className="rounded-full w-14 h-14 lg:w-20 lg:h-20"
                />

                <div>
                  <p className="flex items-center font-semibold text-xl gap-2">
                    {user?.name}
                    <GoVerified className="text-blue-500" />
                  </p>
                  <p className="text-gray-500">
                    {user?.username}
                    {user?.id?.slice(0, 4)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-10 text-gray-500 text-xl border-b">
                <p
                  onClick={() => setshowVideo(true)}
                  className={`ml-14 cursor-pointer ${showVideo && `border-b-2 border-black font-bold text-black`
                    }`}
                >
                  Videos
                </p>

                <p
                  onClick={() => setshowVideo(false)}
                  className={`ml-14 cursor-pointer ${!showVideo && `border-b-2 border-black font-bold text-black`
                    }`}
                >
                  Liked
                </p>
              </div>
            </div>

            {/* bottom */}
            {showVideo ? (
              <>
                {videos?.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5 h-full overflow-y-scroll px-12 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 cursor-pointer">
                    {videos.map((video) => (
                      <VideoList
                        video={video}
                        key={video.videoId}
                        videoId={video.videoId}
                      />
                    ))}
                  </div>
                ) : (
                  <NoResult text="No results found!" />
                )}
              </>
            ) : (
              <>
                {likevideo?.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5 h-full overflow-y-scroll px-12 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 cursor-pointer">
                    {likevideo.map((video) => (
                      <VideoList key={video.videoId} video={video} videoId={video.videoId} />
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

export default Profile;
