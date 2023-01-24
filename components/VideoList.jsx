import Link from 'next/link';
import React from 'react'


function VideoList({ video, videoId }) {
	console.log(video);

	return (
		<Link href={`/detail/${videoId}`}>
			<div className="w-[20%] h-[50%] mt-5 flex flex-col justify-between items-start shadow-md hover:shadow-xl hover:shadow-gray-500 bg-gray-100 cursor-pointer">
				<video src={video?.video} className="w-full h-full" />

				<p>{video?.caption}</p>
			</div>
		</Link>
	);
}

export default VideoList