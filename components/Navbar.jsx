import Link from "next/link";
import React,{useEffect, useState} from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from "next/router";

import { db } from "../firebase";
import { collection, query, where, getDocs,doc,serverTimestamp, setDoc } from "firebase/firestore";

const Navbar = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [Input, setInput] = useState("");
	const [users, setusers] = useState([])

	useEffect(() => {
		if (session) {
			const sendUser = async () => {
				await setDoc(doc(db, 'tiktot_users', session.user.uid), {
					id: session.user?.uid,
					username: session.user?.username,
					name: session.user?.name,
					email: session.user?.email,
					userImg: session.user?.image,
					timestamp: serverTimestamp()
				});
			}

			sendUser();

		}	

		const getUser = async () => {
			const q = query(collection(db, "tiktot_users"));
			const querySnapshot = await getDocs(q);
			let user = [];
			querySnapshot.forEach((doc) => {
				user.push({ ...doc.data(), id: doc.id });
				setusers(user);
			});
		};
				getUser();

		

		
	}, [session]);


	
	const signin = async() => {
		await signIn();

	}

	const handleSearch = async(e) => {
		e.preventDefault();

		const searchInput = Input;

		console.log(searchInput);


		router.push(`/search/${searchInput}`);
		
		setInput("");

		
    

	};

		
		

	
	

	
	return (
		<div className="flex items-center justify-between border-b-4 lg:py-2 px-4 space-x-10 md:space-x-5 lg:px-10">
			{/* left */}
			<Link href="/">
				<img
					src="https://th.bing.com/th/id/R.dd7d2f8931411f4548c3cd108e7079cf?rik=8G7bMPqEQMUAHw&pid=ImgRaw&r=0"
					alt="logo"
					className="w-32 h-18 cursor-pointer"
				/>
			</Link>

			{/* middle */}
			<form
				onSubmit={handleSearch}
				className="bg-gray-200  hidden md:inline-flex items-center p-2 rounded-full space-x-2 w-[30%]">
				<input
					value={Input}
					onChange={(e)=>setInput(e.target.value)}
					type="text"
					placeholder="Search"
					className="outline-none bg-transparent pl-2 border-r-2 border-gray-300 w-full"
				/>

				<button type="submit" className="p-2">
					<BiSearch className="text-gray-400 text-xl" />
				</button>
			</form>

			{/* right */}
			{session ? (
				<div className="flex items-center space-x-5 mr-5">
					<div
						onClick={() => router.push("/upload")}
						className="flex items-center space-x-2 border-2 border-gray-200 p-2 cursor-pointer text-lg font-semibold hover:bg-gray-300 rounded-md ">
						<IoMdAdd color="black" fontSize={21} fontWeight="bold" />
						<p className="hidden md:inline-flex">Upload</p>
					</div>

					<Link href="/">
						<img
							src={session.user?.image}
							className="w-10 h-10 border cursor-pointer rounded-full"
							onClick={() => router.push(`/profile/${session?.user?.uid}`)}
						/>
					</Link>

					<button
						type="button"
						onClick={() => signOut()}
						className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md">
						<AiOutlineLogout color="red" fontSize={21} />
					</button>
				</div>
			) : (
				<div
					onClick={signin}
					className="flex items-center space-x-2 border-2 rounded-md p-2 hover:bg-gray-200 cursor-pointer">
					<FcGoogle className="text-xl md:text-3xl " />
					<p className="text-sm md:text-base whitespace-nowrap">
						Sign In with Google
					</p>
				</div>
			)}
		</div>
	);
};

export default Navbar;
