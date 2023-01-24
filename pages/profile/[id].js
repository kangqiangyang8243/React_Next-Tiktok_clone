import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { db } from '../../firebase';
import { GoVerified } from "react-icons/go";
import VideoList from '../../components/VideoList';
import { useSession } from 'next-auth/react';
function Profile() {
  const router = useRouter();
  const [user, setUser] = useState();
  const { query } = router;
  const [showVideo, setshowVideo] = useState(true)
  const { data: session } = useSession();
  useEffect(() => {
    if (query.id) {
      const unsub = onSnapshot(doc(db, "tiktot_users", query.id), (doc) => {
        setUser(doc.data());
      });

      return unsub;
    }
  }, [db, query]);

  // console.log(user);
  return (
    <div>
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* main */}
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <div className="flex flex-col gap-10 h-full">

            {/* top */}
            <div className='flex space-x-5 items-center ml-10'>
              <img
                src={user?.userImg} alt=""
                className='rounded-full'
              />

              <div>
                <p className='flex items-center font-semibold text-xl gap-2'>
                  {user?.name}
                  <GoVerified className='text-blue-500' />
                </p>
                <p className='text-gray-500'>
                  {user?.username}
                  {user?.id?.slice(0, 4)}
                </p>
              </div>
            </div>

            {/* bottom */}
            <div className=''>
              {/* top */}
              <div className='flex items-center space-x-10 text-gray-500 text-xl border-b'>
                <p
                  onClick={() => setshowVideo(true)}
                  className={`ml-14 cursor-pointer ${showVideo && `border-b-2 border-black font-bold text-black`}`}
                >
                  Videos
                </p>

                <p
                  onClick={() => setshowVideo(false)}
                  className={`ml-14 cursor-pointer ${!showVideo && `border-b-2 border-black font-bold text-black`}`}
                >
                  Liked
                </p>
              </div>

              {/* bottom */}
              <div className="ml-12 mt-5 grid md:grid-cols-2 lg:grid-cols-3 space-x-3 px-2">
                <VideoList
                  id={query.id}
                  showVideo={showVideo}
                  username={session.user?.username}
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile