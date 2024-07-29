import { auth, prisma } from "@/app/auth";
import ServerEditCard from "@/components/elements/ServerEditCard";
import React from "react";

export default async function ServerList() {
	const session = await auth();
	const res = await prisma.user.findUnique({
		where: {
			discordId: session?.user.id,
		},
		select: {
			servers: true,
		},
	});
	if (!res) {
		return;
	}
	return (
		// todo add server button
		<div className="w-full">
			<div className="bg-blue-600 py-24">
				<p className="text-4xl text-white w-1/2 mx-auto">サーバー一覧</p>
			</div>
			<div className="w-1/2 mx-auto mt-5">
				{res.servers?.map((server) => (
					<ServerEditCard
						id={server.id}
						key={server.id}
						name={server.name}
						description={server.description}
						subtitle={server.subtitle}
						image={server.image_url}
					/>
				))}
			</div>
		</div>
	);
}
