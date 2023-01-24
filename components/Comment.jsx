import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { GoVerified } from "react-icons/go";
import { toast } from 'react-toastify';
import TimeAgo from "timeago-react"; 
import NoResult from './NoResult';
function Comments({ id }) {
	const { data: session } = useSession();
	const [comments, setcomments] = useState([]);
	const [message, setmessage] = useState("");
// console.log(id)

	useEffect(() => {
	
		if (id) {
				const unsubscribe = onSnapshot(
					query(
						collection(db, "tiktot_posts", id, "comments"),
						orderBy("timestamp", "desc")
					),
					(snapshot) => {
						const list = [];
						 snapshot.forEach((doc) => {
							 list.push(doc.data());
							 setcomments(list);
						});
					}
			);
			
			return ()=>unsubscribe;
			}

		
		
	}, [db,id]);
	
	const sendComment = async (e) => {
		e.preventDefault()
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

	// console.log(comments)
	return (
		<div className="bg-gray-100 h-[58vh] flex flex-col justify-between relative">
			{/* top */}
			{comments?.length > 0 ? (
				<div className="lg:h-[300px] xl:h-[350px] 2xl:h-[500px] overflow-y-scroll pl-2 pb-10">
				{comments?.map((comment) => (
					<div key={comment.id} className="flex flex-col p-4 border-b-2">
						<Link href={`/profile/${comment?.userId}`}>
							<div className="flex items-center">
								<div className="flex space-x-2 mb-2 w-full">
									{/* left */}
									<img
										src={comment?.userImg}
										alt="userImg"
										className="w-12 h-12 rounded-full cursor-pointer"
									/>

									{/* right */}
									<div className="flex flex-col  items-start flex-grow">
										<h3 className="flex items-center gap-2 text-sm font-semibold lg:text-lg">
											{comment?.name}
											<GoVerified className="text-blue-500" />
										</h3>

										<p className="text-gray-500">
											{comment?.username}
											{comment?.userId?.slice(0, 4)}
										</p>
									</div>

									<div className='text-gray-500 text-sm mt-2'>
										<TimeAgo datetime={comment?.timestamp?.toDate()} />
									</div>
								</div>
							</div>
						</Link>

						{/* comment */}
						<p className="ml-14 text-xl">{comment?.comment}</p>
					</div>
				))}
			</div>
			) : (
					<NoResult text="No Comment!"/>
			)}

			{/* bottom */}
			<div className="w-full h-12 pt-3 flex items-center justify-center bg-white sticky bottom-2">
				<form onSubmit={sendComment} className="w-[60%] flex items-center">
					<input
						type="text"
						placeholder="Input your comment..."
						className="w-full px-3 py-1 bg-transparent rounded-md border border-gray-300 outline-none focus:shadow-lg"
						value={message}
						onChange={(e) => setmessage(e.target.value)}
					/>
					<button type="submit" className="text-gray-500 ml-2 text-sm">
						Send
					</button>
				</form>
			</div>
		</div>
	);
}

export default Comments