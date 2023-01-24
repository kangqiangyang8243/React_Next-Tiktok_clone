import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function LikeBtn({ id }) {
	const { data: session } = useSession();
	const [likes, setLikes] = useState([]);
	const [hasLike, setHasLike] = useState(false);
	const [videos, setVideos] = useState([]);

  useEffect(() => {
		if (id) {
						
			 const likeUnSub = onSnapshot(
					collection(db, "tiktot_posts", id, "like"),
					(snapshot) => {
						setLikes(snapshot.docs);
					}
			);

			
			
			return likeUnSub;

		}
    
   
    
	}, [db, id]);


	useEffect(() => { 
		if (id) {
			const unsub = onSnapshot(doc(db, "tiktot_posts", id), (doc) => {
				setVideos({...doc.data(),videoId:doc.id});
		})

			
		}
	}, [db,id]);
	
	// console.log(videos);

	useEffect(() => {
		
			setHasLike(
				likes.findIndex((like) => like.id === session?.user?.uid) !== -1
			);

  }, [likes]);
  
  const likeVideo = async () => {
		if (session && videos) {
			if (hasLike) {
				await deleteDoc(
					doc(db, "tiktot_posts", id, "like", session?.user?.uid)
				);

				await deleteDoc(doc(db, "tiktot_likes", session?.user?.uid));
			} else {
				await setDoc(
					doc(db, "tiktot_posts", id, "like", session?.user?.uid),
					{
						username: session.user?.username,
					}
				);

				await addDoc(collection(db, "tiktot_likes"), {
					videoId: videos.videoId ,
					video: videos.video,
					caption: videos.caption,
					userId: session.user.uid,
					timestamp: serverTimestamp(),
				});
			}
		}
	};

	return (
		<div className="flex items-center space-x-1">
			{hasLike ? (
				<AiFillHeart
					onClick={likeVideo}
					className="text-3xl ml-2 cursor-pointer text-red-500"
				/>
			) : (
				<AiOutlineHeart
					onClick={likeVideo}
					className="text-3xl ml-2 cursor-pointer"
				/>
			)}

			{likes?.length > 0 && <p className="text-gray-500">{likes?.length}</p>}
		</div>
	);
}

export default LikeBtn