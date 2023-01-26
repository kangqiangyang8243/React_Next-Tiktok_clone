import Link from 'next/link';
import React from 'react'


function VideoList({ video, videoId }) {
	// console.log(video);

	return (
		<Link href={`/detail/${videoId}`}>
			<div className='flex flex-col border-b-2 pb-10 md:pb-0 items-center space-y-5 md:space-y-0 my-5 md:border-none'>
				<video src={video?.video} className="h-full  shadow-md rounded-lg hover:shadow-xl" />

				<p className='text-xl md:text-lg'>{video?.caption}</p>
			</div>
		</Link>
	);
}

export default VideoList