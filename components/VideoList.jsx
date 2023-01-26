import Link from 'next/link';
import React from 'react'


function VideoList({ video, videoId }) {
	// console.log(video);

	return (
		<Link href={`/detail/${videoId}`}>
			<div className="w-full h-full">
				<video src={video?.video} className="shadow-md hover:shadow-xl" />

				<p>{video?.caption}</p>
			</div>
		</Link>
	);
}

export default VideoList