import ServerEditModalContainer from "@/components/elements/serverEditmodal";
import Link from "next/link";
import React from "react";

const ServerEditCard = ({
	id,
	name,
	description,
	subtitle,
	image,
}: {
	id: string;
	name: string;
	description: string;
	subtitle: string;
	image: string;
}) => {
	return (
		<>
			<div className="border border-gray-400 rounded-2xl w-80 shadow-xl p-2">
				<p className="text-gray-700 text-2xl font-bold ">{name}</p>
				<div className="mt-12 flex">
					<Link
						href={`/servers/${id}`}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						見る
					</Link>
					<ServerEditModalContainer
						id={id}
						key={id}
						name={name}
						description={description}
						subtitle={subtitle}
						image={image}
					/>
				</div>
			</div>
		</>
	);
};
export default ServerEditCard;
