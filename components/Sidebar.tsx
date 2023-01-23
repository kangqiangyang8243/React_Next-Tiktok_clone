import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discovery from './Discovery';
import Footer from './Footer';
import SuggestAccount from './SuggestAccount';
const Sidebar = () => {
  const [ShowSidebar, setShowSidebar] = useState(true);
  const {pathname} = useRouter();

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

					<SuggestAccount/>

					<Footer/>
				</div>
			)}
		</div>
	);
}

export default Sidebar