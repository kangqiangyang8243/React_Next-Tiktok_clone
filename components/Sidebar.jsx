import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { db } from '../firebase';
import { GoVerified } from "react-icons/go";
import Discovery from './Discovery';
import Footer from './Footer';
import { useSession } from 'next-auth/react';
const Sidebar = () => {
	const [ShowSidebar, setShowSidebar] = useState(true);
	const [userInfo, setuserInfo] = useState([]);
	const { pathname } = useRouter();
	const { data: session } = useSession();
	useEffect(() => {

		if (session) {
			const getData = async () => {
				setuserInfo([]);
				const q = query(
					collection(db, "tiktot_users"),
					where("id", "!=", session?.user?.uid)
				);
				const querySnapshot = await getDocs(q);

				let user = [];
				querySnapshot.forEach((doc) => {
					user.push({ ...doc.data(), id: doc.id });
					setuserInfo(user);
				});
			};
					getData();

		} else {
			setuserInfo([]);

			const getData = async () => {
				const q = query(
					collection(db, "tiktot_users")
				);
				const querySnapshot = await getDocs(q);

				let user = [];
				querySnapshot.forEach((doc) => {
					user.push({ ...doc.data(), id: doc.id });
					setuserInfo(user);
				});
			};
			getData();
		}

	

	}, [db,session]);
	
	// console.log(userInfo);
	// console.log(session)

  return (
		<div className="flex flex-col space-y-3 border-r-2 h-full w-[70px] lg:w-[400px] overflow-y-scroll">
			<div
				className="cursor-pointer lg:hidden text-2xl px-5 pt-3"
				onClick={() => setShowSidebar(!ShowSidebar)}>
				{ShowSidebar ? <AiOutlineMenu /> : <ImCancelCircle />}
			</div>
			{ShowSidebar && (
				<div className="space-y-3 lg:divide-y-4 px-3">
					<Link href="/">
						<div
							className={`flex items-center gap-5 font-semibold hover:bg-gray-200 p-2 cursor-pointer rounded-md ${
								pathname == "/" ? "text-red-500 " : "text-black"
							}`}>
							<AiFillHome className="text-2xl " />
							<h2 className="capitalize text-xl hidden lg:block">For You</h2>
						</div>
					</Link>

					<Discovery />

					<div className="px-2">
						<h3 className="font-semibold text-gray-500 my-2 hidden lg:block">
							Suggested accounts
						</h3>

						{session && (
							<Link href={`/profile/${session.user?.uid}`}>
								<div className="flex space-x-3 items-center">
									<img
										src={session?.user?.image}
										alt=""
										className="rounded-full w-7 h-7 lg:w-10 lg:h-10 -ml-[2px] lg:-ml-0"
									/>

									<div className="hidden lg:inline">
										<p className="flex items-center	font-semibold text-lg gap-2">
											{session?.user?.name}
											<GoVerified className="text-blue-500" />
										</p>
										<p className="text-gray-500 text-sm">
											{session?.user?.username}
											{session?.user?.uid?.slice(0, 4)}
										</p>
									</div>
								</div>
							</Link>
						)}

						{userInfo?.length > 0 &&
							userInfo?.slice(0,5).map((users) => {
								<div key={users.id}>
									users
								</div>
							})}
					</div>

					<Footer />
				</div>
			)}
		</div>
	);
}

export default Sidebar