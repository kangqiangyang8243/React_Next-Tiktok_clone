import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { GoVerified } from "react-icons/go";

function Comments({ id }) {
	const { data: session } = useSession();
	const [comments, setcomments] = useState([]);
	const [message, setmessage] = useState("");
// console.log(id)

	useEffect(() => {
		if (id) { 
		const getData = async () => {
			const q = query(
				collection(db, "tiktot_posts", id, 		"comments"),
				orderBy("timestamp", "desc")
			);
			
			const querySnapshot = await getDocs(q);
			
			let commentUpdates = [];
			querySnapshot.forEach((doc) => {
				return commentUpdates.push({
					id: doc.id,
					data: doc.data(),
				});
			});
		
	setcomments(commentUpdates);
};

getData();

		}
		
	}, [db,id]);
	
  const sendComment = async () => {
    const collRef = collection(db, "tiktot_posts", id, "comments");
		if (session) {
			await addDoc(collRef, {
				comment: message,
				name: session?.user?.name,
				username: session?.user?.username,
				userImg: session?.user?.image,
				timestamp: serverTimestamp(),
				userId: session?.user?.uid,
			});

    	setmessage("");

    }
    
	};

	console.log(comments)
	return (
		<div className="bg-gray-100 h-full flex flex-col justify-between relative">
				{/* top */}
				<div className='lg:h-[300px] xl:h-[350px] 2xl:h-[500px] overflow-y-scroll pl-2'> 
					{comments.map((comments) => (
						<div className="flex flex-col p-4 border-b-2">
							<Link href={`/profile/${comments?.data?.userId}`}>
								<div className="flex items-center space-x-2">
									{/* left */}
									<img
										src={comments?.data?.userImg}
										alt="userImg"
										className="w-12 h-12 rounded-full cursor-pointer"
									/>

									{/* right */}
									<div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-2">
										<h3 className="flex items-center gap-2 text-sm font-semibold lg:text-lg">
											{comments?.data?.name}
											<GoVerified className="text-blue-500" />
										</h3>
										<p className="flex items-center space-x-1">
											<span className="text-gray-500">
												{comments?.data?.username}
												{comments?.data?.userId.slice(0, 4)}
											</span>
										</p>
									</div>
								</div>
							</Link>

							{/* comment */}
							<p className="ml-14 text-xl">{comments?.data?.comment}</p>
						</div>
					))}
			</div>
			
			{/* bottom */}
			<div className="w-full h-12 flex items-center justify-center bg-white absolute bottom-0">
				<div className="w-[70%] flex items-center">
					<input
						type="text"
						placeholder="Input your comment..."
						className="w-full px-3 py-1 bg-transparent rounded-md border border-gray-300 outline-none"
						value={message}
						onChange={(e) => setmessage(e.target.value)}
					/>
					<button onClick={sendComment} className="text-gray-500 ml-2 text-sm">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default Comments