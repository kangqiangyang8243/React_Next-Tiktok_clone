import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Video } from '../types'
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import TimeAgo from "timeago-react";
import { useRouter } from 'next/router';


const VideoCard = ({ post }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [IsHover, setIsHover] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
	const [playing, setPlaying] = useState<boolean>(false);
	

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    }
    else {
      videoRef.current?.play();
      setPlaying(true);
    }
  }

	useEffect(() => {
		if (videoRef?.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [isVideoMuted]);

	
	// console.log(post)

  return (
		<div className="border-b-2 pb-10 flex flex-col">
			<div className="flex space-x-4">
				{/* left */}
				<div className=" rounded-full mt-2">
					<Link href={`/profile/${post?.data?.uid}`}>
						<div className="w-16 h-16">
							<img
								src={post?.data?.userImg}
								alt="user_avatar"
								className="object-cover  cursor-pointer rounded-full"
							/>
						</div>
					</Link>
				</div>

				{/* right */}
				<div className="flex flex-col p-2 space-y-3">
					<div className="flex justify-between">
						<div className="flex flex-col">
							<h3 className="flex items-center gap-2 text-md font-semibold md:text-xl">
								{post?.data?.name}
								<GoVerified className="text-blue-500" />
							</h3>
							<p className="flex items-center space-x-1">
								<span className="text-gray-500">
									{post?.data?.username}
									{post?.data?.uid.slice(0, 4)}
								</span>
							</p>
						</div>

						<div className="hidden md:inline text-gray-500 text-md mt-2">
							<TimeAgo datetime={post?.data?.timestamp.toDate()} />
						</div>
					</div>

					<p className="text-xl">{post?.data?.caption}</p>

					<div
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
						className=" rounded-3xl relative">
						<Link href={`/detail/${post?.id}`}>
							<video
								loop
								ref={videoRef}
								src={post?.data?.video}
								className="bg-gray-100 w-[400px] h-[400px] -ml-20 sm:ml-0 md:h-[500px] rounded-2xl cursor-pointer"
							/>
						</Link>

						{IsHover && (
							<div className="absolute bottom-6 cursor-pointer w-[300px] sm:w-[400px] -ml-20 sm:ml-0 flex justify-between px-4">
								{playing ? (
									<button>
										<BsFillPauseFill
											onClick={onVideoPress}
											className="text-3xl hover:text-gray-500"
										/>
									</button>
								) : (
									<button>
										<BsFillPlayFill
											onClick={onVideoPress}
											className="text-3xl hover:text-gray-500"
										/>
									</button>
								)}

								{isVideoMuted ? (
									<button>
										<HiVolumeOff
											onClick={() => setIsVideoMuted(false)}
											className="text-3xl hover:text-gray-500"
										/>
									</button>
								) : (
									<button>
										<HiVolumeUp
											onClick={() => setIsVideoMuted(true)}
											className="text-3xl hover:text-gray-500"
										/>
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VideoCard