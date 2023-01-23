import Head from 'next/head'
import { useEffect, useState } from 'react'
import NoResult from '../components/NoResult'
import VideoCard from '../components/VideoCard'
import { db } from "../firebase";
import {
	collection,
	query,
	getDocs,
	orderBy,
} from "firebase/firestore";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'



const Home = () => {
	const [videoAssest, setVideoAssest] = useState();

	useEffect(() => {

		const getData = async () => {
			const q = query(
				collection(db, "tiktot_posts"), orderBy("timestamp", "desc")
			);

			const querySnapshot = await getDocs(q);

			let videos = [];
			querySnapshot.forEach((doc) => {
				return videos.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setVideoAssest(videos);
		};

		getData();
	}, [db]);

	// console.log(videoAssest);
	return (
		<div>
			<Head>
				<title>Tiktot Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* Navbar */}
			<Navbar />
			{/* body */}
			<div className="flex gap-2 md:gap-6 lg:gap-10 max-w-7xl mx-auto">
				<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
					{/* Sidebar */}
					<Sidebar />
				</div>

				{/* main */}
				<div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
					<div className="flex flex-col gap-10 h-full">
						{videoAssest?.length ? (
							videoAssest?.map((video) => (
								<VideoCard post={video} key={video.id} />
							))
						) : (
							<NoResult text={`No Videos`} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

