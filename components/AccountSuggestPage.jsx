import React from 'react'

const AccountSuggestPage = ({ user }) => {
	console.log(user);
	return (
		<div className="flex space-x-5 items-center ml-10">
			<h1>sss</h1>
			{/* <img src={user?.userImg} alt="" className="rounded-full" />

			<div>
				<p className="flex items-center font-semibold text-xl gap-2">
					{user?.name}
					<GoVerified className="text-blue-500" />
				</p>
				<p className="text-gray-500">
					{user?.username}
					{user?.id?.slice(0, 4)}
				</p>
			</div> */}
		</div>
	);
};

export default AccountSuggestPage;