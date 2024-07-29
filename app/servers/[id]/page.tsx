import { prisma } from "@/app/auth";
import DiscordButton from "@/components/elements/discordButton";
import Header from "@/components/layouts/header";
import img from "@/public/images/img.png";
import Image from "next/image";
import React from "react";
import { fetchStreamData } from "../../../utils/readerStream";
import removeCaretAndNumber from "../../../utils/removeCaretAndNumber";

export default async function ServerList({
	params,
}: { params: { id: string } }) {
	const { id } = params;
	const res = await fetchStreamData(
		`https://servers-frontend.fivem.net/api/servers/single/${id}`,
	);
	console.log(res.Data.players[0]);
	// todo dbから
	const server = await prisma.server.findUnique({
		where: {
			id: id,
		},
	});
	const clients = res.Data.clients;
	const maxClients = res.Data.sv_maxclients;
	const serverName = removeCaretAndNumber(res.Data.vars.sv_projectName);
	const description = res.Data.vars.sv_projectDesc;
	const discordUrl = res.Data.vars.Discord;
	const connectEndPoints = res.Data.connectEndPoints;
	const score = res.Data.upvotePower;
	const tags = res.Data.vars.tags.split(",");
	const copyToClipboard = async (text: string) => {
		await global.navigator.clipboard.writeText(text);
	};
	return (
		<>
			<Header />
			<div className="flex max-w-6xl mx-auto gap-5 mt-20">
				<div>
					<Image src={img} alt="Card" />
					<p className="text-4xl text-blue-500 font-bold mt-8 mb-4">
						{server?.name}
					</p>
					<p className="text-gray-600 font-medium">{server?.subtitle}</p>
					<div className="mt-8 whitespace-pre-wrap font-medium text-lg text-gray-800">
						{server?.description}
					</div>
				</div>
				<ul className="border-2 p-5 rounded-xl flex flex-col gap-8 border-gray-300">
					<li>
						<div>
							<label htmlFor="server-port-number">
								<p className="text-2xl text-blue-500 font-bold">
									サーバーアドレス
								</p>
							</label>
							<input
								type="text"
								id="server-port-number"
								readOnly
								value={connectEndPoints[0]}
								className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs"
							/>
						</div>
						<button
							type="button"
							className="my-2 px-5 py-3 text-base font-semibold text-center text-white bg-blue-500 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							このサーバーに参加する
						</button>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">プレーヤー数</p>
						<p className="text-md">
							{clients}/{maxClients}
						</p>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">スコア</p>
						<p className="text-md">{score}</p>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">タグ</p>
						{tags.map((tag: string) => (
							<span
								key={tag}
								className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
							>
								#{tag}
							</span>
						))}
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">リンク</p>
						<DiscordButton text="Discord" url={discordUrl} />
						<div className="flex items-center justify-center">
							<a
								type="button"
								className="bg-teal-600 flex items-center border border-gray-300 rounded-lg shadow-md px-16 py-3 text-sm font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								href="https://discord.gg/ywUkdwG6Pt"
							>
								<span>ホームページ</span>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}
