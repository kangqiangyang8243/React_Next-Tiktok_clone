import React, {  useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { topics } from '../utils/constants';
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from '../firebase'; 
import { getBlob, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify';
import { get } from 'http';


const Upload = () => {
  const [videoAsset, setVideoAsset] = useState();
  const [videoURL, setVideoURL] = useState("");

  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { data: session } = useSession();
	const router = useRouter();
  const uploadVideo = async(e) => {
    e.preventDefault();    
    const selectedFile = e.target.files[0];
  	var reader = new FileReader();

    if (selectedFile) {
			setLoading(true);

      		setVideoAsset(selectedFile);
			
			 const storageRef = ref(storage, `tiktot/${session.user.uid}/${Date.now()}-${selectedFile.name}`);
		   
		uploadBytesResumable(storageRef,selectedFile).then(async () => {
			await getDownloadURL(storageRef).then((url) => {
				setVideoURL(url);
			});
		});
    	
		} else {
			setLoading(false);
		}

			setLoading(false);

	// console.log(videoURL);
			  // console.log(videoAsset);

	};
		// console.log(videoURL);



  const handlePost = async() => {
   
	  
	  
	  try {
		setLoading(true);
		
	const docRef = collection(db, "tiktot_posts");
			  
     const docReff =  await addDoc(docRef, {
        uid: session.user?.uid,
        username: session.user?.username,
        name: session.user?.name,
        email: session.user?.email,
        userImg: session.user?.image,
        caption: caption,
		topic: topic,
		video: videoURL,
        timestamp: serverTimestamp(),
	  });
		

	    setLoading(false);
		toast.success("Post Submitted!");

	    router.push('/');
	  
	  } catch (error) {
		setLoading(false);
		toast.error("Something went wrong!",error.message);


	  }
    
    
	  
  }; 


   const handleDiscard = () => {
			setSavingPost(false);
     setVideoAsset(undefined);
     setVideoURL("");
			setCaption("");
	   setTopic("");
	   toast.success("Post Discarded!");

  };
  

 
  return (
		<div className="">
			<Navbar />
			{/* // bg */}
			<div
				className={`max-w-6xl mx-auto mt-10 ${
					loading && "flex items-center justify-center"
				}`}>
				{loading ? (
					<p className="text-center text-3xl text-red-400 font-semibold">
						Uploading...
					</p>
				) : (
					<>
						{/* container */}
						<div className="space-y-10 md:space-y-5  flex flex-col items-center md:items-start bg-white ">
							<div className="flex flex-col items-center md:items-start">
								<p className="text-lg md:text-2xl font-bold">Upload Video</p>
								<p className="text-md text-gray-400 mt-1">
									Post a video to your account
								</p>
							</div>

							{/* bottom */}
							<div className="w-full flex flex-col md:flex-row items-center md:gap-10 sm:px-6 md:px-0">
								{!videoAsset ? (
									<div className="border-4 border-dashed w-[250px] sm:w-[300px] md:w-[50%] hover:bg-gray-100 hover:border-orange-300">
										<label
											htmlFor="video"
											className="cursor-pointer flex flex-col items-center px-5 py-14 space-y-5">
											<FaCloudUploadAlt className="text-6xl text-gray-300" />

											<h3 className="font-bold text-md md:text-lg">
												Select Video to Upload
											</h3>

											<p className="text-center text-gray-400">
												MP4 or WebM or ogg <br />
												720x1280 resolution or higher <br />
												Up to 10 minutes <br />
												Less than 2 GB
											</p>

											<p className="bg-pink-500 w-full rounded-md text-center py-2 hover:bg-pink-400">
												Select File
											</p>

											<input
												type="file"
												id="video"
												name="upload video"
												hidden
												accept="video/mp4,video/x-m4v,video/*"
												  onChange={(e) => uploadVideo(e)}
												
											/>
										</label>
									</div>
								) : (
									<div className="flex flex-col items-center justify-evenly w-[250px] sm:w-[300px] md:w-[50%] h-[400px] md:h-[500px] bg-gray-200 rounded-3xl shadow-lg">
										<video controls loop src={videoURL} className="w-full" />

										<div className="flex flex-col items-center  w-full px-2 text-lg space-y-5">
											<p className="font-bold text-sm md:text-base">{videoAsset?.name}</p>
											<button
												onClick={() => {
													setVideoAsset(undefined);
													setVideoURL("");
												}}
												className="flex items-center w-full justify-center px-2 bg-gray-100 rounded-lg hover:shadow-lg shadow-sm">
												<MdDelete />
												<span>Delete</span>
											</button>
										</div>
									</div>
								)}

								{/* caption */}
								<div className="flex flex-col w-[250px] sm:w-[300px] mb-10 space-y-5 md:w-[80%] md:mr-10">
									<div className="flex flex-col mt-5 space-y-2">
										<label>Caption</label>
										<input
											type="text"
											value={caption}
											onChange={(e) => setCaption(e.target.value)}
											placeholder="Input Your Caption.."
											className="border-2 border-gray-200 p-2 rounded-md"
										/>
									</div>

									<div className="flex flex-col space-y-2">
										<label>Choose a Topics</label>
										<select
											onChange={(e) => setTopic(e.target.value)}
											className="border-2 border-gray-200 p-2 rounded-md">
											{topics.map((topic) => (
												<option value={topic.name} key={topic.name}>
													{topic.name}
												</option>
											))}
										</select>
									</div>

									<div className="flex items-center justify-between">
										<button
											onClick={handleDiscard}
											className="bg-white border-2 border-gray-200 py-2 px-3 rounded-md hover:bg-gray-100">
											Discard
										</button>
										<button
											disabled={videoURL ? false : true}
											onClick={handlePost}
											className="bg-pink-500 py-2 px-3 rounded-md text-center text-white font-bold hover:bg-pink-400 disabled:cursor-not-allowed">
											{savingPost ? "Uploading.." : " Upload"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Upload