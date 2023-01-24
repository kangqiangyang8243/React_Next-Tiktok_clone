import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

function VideoList({ id, showVideo,username }) {
  const [video, setVideo] = useState([]);
  const [likevideo, setLikeVideo] = useState([]);
  useEffect(() => {
		if (id) {
			if (showVideo && username) {
				const q = query(collection(db, "tiktot_posts"), where("uid", "==", id));

				const unVideosubscribe = onSnapshot(q, (querySnapshot) => {
					const video = [];
					querySnapshot.forEach((doc) => {
						video.push(doc.data());
						setVideo(video);
					});
				});

				return unVideosubscribe;
			} else {
				const q = query(collection(db, "tiktot_posts"));

				const getLike = async () => {
					const snapshot = await getDocs(q);

					const unLikesubscribe = snapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}));

					unLikesubscribe.map((elem) => {
						const likedQ = query(
							collection(db, `tiktot_posts/${elem.id}/like`),
							where("username", "==", username)
						);

						const like = onSnapshot(likedQ, (querySnapshot) => {
							let list = [];
							querySnapshot.docs.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
								setLikeVideo(list);
							});
						});

						return like;
					});
				};
				getLike();
			}
		}
	}, [id, showVideo, db, username]);
  

  // console.log(video)

  // console.log(likevideo);
  return (
    <div>

    </div>
  )
}

export default VideoList