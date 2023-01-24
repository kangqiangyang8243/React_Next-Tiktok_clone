import Link from 'next/link';
import React from 'react'


function VideoList({ video, videoId }) {
	// console.log(video);

	return (
		<Link href={`/detail/${videoId}`}>
			<div className="w-[100%] h-[25%] sm:w-[50%] sm:h-[35%] md:w-[40%] md:h-[30%] lg:w-[30%] mt-5 flex flex-col justify-between items-start shadow-md hover:shadow-xl hover:shadow-gray-500 bg-gray-100 cursor-pointer">
        <video src={video?.video} width="100% " />

				<p>{video?.caption}</p>
			</div>
		</Link>
	);
}

export default VideoList