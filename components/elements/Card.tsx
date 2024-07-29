"use server";
import { prisma } from "@/app/auth";
import img_ from "@/public/images/img_1.png";
import { fetchStreamData } from "@/utils/readerStream";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = async ({
	server_id,
	order,
}: { server_id: string; order: number }) => {
	let clients = 0;
	let tags = [];
	try {
		const res = await fetchStreamData(
			`https://servers-frontend.fivem.net/api/servers/single/${server_id}`,
		);
		clients = res.Data.clients;
		tags = res.Data.vars.tags.split(",");
	} catch (e) {
		console.log(e);
	}

	const server = await prisma.server.findUnique({
		where: {
			id: server_id,
		},
		select: { name: true, subtitle: true, image_url: true },
	});
	if (!server) return;
	const resizedHomeCardUrl = server.image_url.replace("public", "HomeCard");
	return (
		<Link
			href={`/servers/${server_id}`}
			className="rounded-xl shadow-lg relative"
		>
			<div className="absolute top-0 left-0 z-50 bg-blue-500 rounded-3xl w-14 text-white font-bold text-center">
				{order + 1}位
			</div>
			<div>
				<img src={`${resizedHomeCardUrl}`} alt="server card" />
			</div>
			<div>
				<div className="px-6 pt-2">
					{tags.map((tag: string) => (
						<span
							key={tag}
							className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
						>
							#{tag}
						</span>
					))}
				</div>
				<div className="px-6 flex">
					<Image
						src={img_}
						alt={"asss"}
						width={50}
						height={50}
						style={{ objectFit: "scale-down" }}
					/>
					<div>
						<div className="font-bold text-xl text-blue-600">{server.name}</div>
						<p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
							{server.subtitle}
						</p>
					</div>
				</div>
				<div className="p-1.5 bg-emerald-100 text-sm font-bold flex text-emerald-500 justify-end">
					<p className="font-sm mr-2">
						プレーヤー <span className="font-bold">{clients}人</span>
					</p>
				</div>
			</div>
		</Link>
	);
};
export default Card;
