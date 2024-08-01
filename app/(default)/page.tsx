import { prisma } from "@/app/auth";
import Card from "@/components/elements/Card";

export const metadata = {
	title: "Home - Simple",
	description: "Page description",
};

export default async function Home() {
	const servers = await prisma.server.findMany({
		select: { id: true },
	});
	console.log(servers);
	return (
		<>
			<div className="bg-blue-600">
				<div className="mx-auto max-w-7xl ">
					<h1 className="mb-6 text-4xl font-bold text-gray-100 pt-32 pb-32">
						Fivemサーバーリスト
					</h1>
				</div>
			</div>

			<div className="max-w-7xl mx-auto flex gap-8 flex-wrap mt-24">
				{servers.map((server, index) => (
					<Card key={server.id} server_id={server.id} order={index} />
				))}
			</div>
		</>
	);
}
