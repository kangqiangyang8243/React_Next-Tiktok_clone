import React from 'react'
import { MdOutlineVideocamOff } from "react-icons/md";

interface Props {
	text: string;
}


function NoResult({ text }: Props) {
  return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<p className="text-8xl">
				<MdOutlineVideocamOff />
			</p>
			<p className="text-2xl text-center">{text}</p>
		</div>
	);
}

export default NoResult