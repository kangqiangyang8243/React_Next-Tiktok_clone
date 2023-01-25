import Link from 'next/link';
import React from 'react'


function VideoList({ video, videoId }) {
	// console.log(video);

	return (
		<Link href={`/detail/${videoId}`}>
			<div className='flex flex-col  w-[100%] lg:w-[30%] lg:h-[35%] border-b-2 pb-5 lg:pb-0 lg:border-none mt-5 cursor-pointer'>
				<video src={video?.video} className="w-[100%] shadow-md hover:shadow-xl" />

				<p>{video?.caption}</p>
			</div>
      
		</Link>
	);
}

export default VideoList