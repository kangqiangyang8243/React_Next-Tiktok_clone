import Head from 'next/head'
import { useEffect, useState } from 'react'
import NoResult from '../components/NoResult'
import VideoCard from '../components/VideoCard'
import { db } from "../firebase";
import {
	collection,
	query as querys,
	getDocs,
	orderBy,
	where,
} from "firebase/firestore";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router';



const Home = () => {
	const [videoAssest, setVideoAssest] = useState();

	const { query } = useRouter();

	// console.log(query)

	// console.log(post)

	// useEffect(() => {
	// 	if (query.topic) {

	// 	}
	// }, [query]);

	useEffect(() => {

		if (query.topic) {
			const getData = async () => {
				setVideoAssest([]);
				const q = querys(
					collection(db, "tiktot_posts"), where("topic", '==', query.topic), orderBy("timestamp", "desc")
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
		}
		else {

			const getData = async () => {
				setVideoAssest([]);

				const q = querys(
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
		}
	}, [db, query]);

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
				<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto ">
					{/* Sidebar */}
					<Sidebar />
				</div>

				{/* main */}
				<div className="mt-4 flex flex-col gap-10 overflow-auto scrollbar-hide h-[88vh] videos flex-1">
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

