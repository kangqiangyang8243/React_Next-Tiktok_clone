import Link from 'next/link'
import React from 'react'
import { GoVerified } from "react-icons/go";

function Accounts({user,account}) {
    // console.log(user)
  return (
      <div className={` cursor-pointer ${account  && `p-2 w-[90%] border-b shadow-md hover:shadow-lg`}`}>
          <Link href={`/profile/${user?.id}`}>
    <div className="flex space-x-3 items-center">
        <img
            src={user?.userImg}
            alt=""
            className="rounded-full w-10 h-7 lg:w-10 lg:h-10 -ml-[2px] lg:-ml-0"
        />

        <div className="hidden lg:inline">
            <p className="flex items-center	font-semibold text-lg gap-2">
                {user?.name}
                <GoVerified className="text-blue-500" />
            </p>
            <p className="text-gray-500 text-sm">
                {user?.username}
                {user?.id?.slice(0, 4)}
            </p>
        </div>
    </div>
</Link></div>
  )
}

export default Accounts