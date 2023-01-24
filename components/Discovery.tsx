import Link from 'next/link';
import React from 'react'
import { topics } from '../utils/constants';

const Discovery = () => {
  return (
		<div className="lg:px-2">
			<h3 className="font-semibold text-gray-500 mt-2  hidden lg:block">
				Popular Topics
			</h3>
			<div className="flex flex-col lg:flex-row  flex-wrap items-start lg:items-center gap-2 mt-2">
				{topics.map((topic) => (
					<Link href={`/?topic=${topic.name}`} key={topic.name}>
						<div
							className="flex items-center space-x-2 bg-transparent lg:border-2 px-2 lg:px-3 py-2 rounded-full  cursor-pointer hover:bg-gray-200">
							<h4 className="text-2xl lg:text-base">{topic.icon}</h4>
							<span className="hidden lg:inline">{topic.name}</span>
							
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Discovery