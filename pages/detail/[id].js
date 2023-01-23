import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, deleteDoc, query as querys } from "firebase/firestore";
import { toast } from 'react-toastify';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Comments from '../../components/Comment';
import { useSession } from 'next-auth/react';
import LikeBtn from '../../components/LikeBtn';

function Detail() {
  const router = useRouter();
  const { query } = useRouter();
  const [videoAssest, setvideoAssest] = useState();
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setisHover] = useState(false)
  const { data: session } = useSession();

  // console.log(query.id)
  useEffect(() => {

    if (query.id) {
      const getData = async () => {
        const docRef = doc(db, "tiktot_posts", query.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setvideoAssest(docSnap.data());
        } else {
          toast.error("No such video found!")
        }
      }

      getData();
    }
  }, [query]);


  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);


  // console.log(videoAssest);

  const handlePlay = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };




  return (
    <div className='w-full h-full flex flex-col lg:flex-row '>



      {/* left */}
      <div className='w-full lg:w-[60%] bg-gray-500  h-full'>
        <div
          onMouseEnter={() => setisHover(true)}
          onMouseLeave={() => setisHover(false)}
          className=" rounded-3xl relative h-full">
          <video
            ref={videoRef}
            src={videoAssest?.video}
            loop
            className='h-[100%] w-full'
          />

          {isHover && (
            <p
              className='cursor-pointer w-8 h-8 rounded-full absolute z-40 top-5 left-1'
              onClick={() => router.back()}>
              <MdOutlineCancel className='text-white text-center text-[35px] hover:opacity-90' />
            </p>
          )}

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer z-40 text-white flex flex-col justify-between h-[50%] w-full items-center">
              {play ? (
                <button>
                  <BsFillPauseFill
                    onClick={handlePlay}
                    className=" text-[50px] hover:opacity-90"
                  />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill
                    onClick={handlePlay}
                    className="text-[50px]  hover:opacity-90"
                  />
                </button>
              )}
            </div>
          )}

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer z-40 text-white flex justify-end items-end w-full pr-5 pb-2">
              {isMuted ? (
                <button>
                  <HiVolumeOff
                    onClick={() => setIsMuted(false)}
                    className="text-3xl hover:opacity-90"
                  />
                </button>
              ) : (
                <button>
                  <HiVolumeUp
                    onClick={() => setIsMuted(true)}
                    className="text-3xl hover:opacity-90"
                  />
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      {/* right */}
      <div className='flex flex-col flex-1 justify-between h-full'>
        {/* top */}
        <div className='space-y-10 px-10 py-5 border-b-2 h-[40%]'>
          <Link href={`/profile/${videoAssest?.uid}`}>
            <div className='flex items-center space-x-2'>
              {/* left */}
              <img
                src={videoAssest?.userImg}
                alt="userImg"
                className='w-12 h-12 rounded-full cursor-pointer'
              />

              {/* right */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold lg:text-lg">
                  {videoAssest?.name}
                  <GoVerified className="text-blue-500" />
                </h3>
                <p className="flex items-center space-x-1">
                  <span className="text-gray-500">
                    {videoAssest?.username}
                    {videoAssest?.uid.slice(0, 4)}
                  </span>
                </p>
              </div>
            </div>
          </Link>

          {/* caption */}
          <p className='ml-2 text-xl'>
            {videoAssest?.caption}
          </p>

          {/* like */}
          <LikeBtn id={query.id} />
        </div>


        {/* bottom */}
        <div className='flex-1 w-full'>
          <Comments
            id={query.id}
          />

        </div>



      </div>
    </div>
  )
}

export default Detail