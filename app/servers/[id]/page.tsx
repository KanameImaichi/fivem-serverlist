import DiscordButton from "@/components/elements/discordButton";
import Header from "@/components/layouts/header";
import img from "@/public/images/img.png";
import Image from "next/image";
import React from "react";

export default function ServerList({ params }: { params: { slug: string } }) {
	const { slug } = params;

	return (
		<>
			<Header />
			<div className="flex max-w-6xl mx-auto gap-5 mt-20">
				<div>
					<Image src={img} alt="Card" />
					<p className="text-5xl text-blue-500 font-bold">できたてサーバー</p>
				</div>
				<ul className="border-2 p-5 rounded-xl flex flex-col gap-8">
					<li>
						<p className="text-2xl text-blue-500 font-bold">サーバーアドレス</p>
						<p className="text-md text-gray-700">commet.jp</p>
						<button
							type="button"
							className="my-2 px-5 py-3 text-base font-semibold text-center text-white bg-blue-500 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							このサーバーに参加する
						</button>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">スコア</p>
						<p className="text-md">1500</p>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">プレーヤー数</p>
						<p className="text-md">102/888</p>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">投票数</p>
						<p className="text-md">102/888</p>
						<button
							type="button"
							className="my-2 px-5 py-3 text-base font-semibold text-center text-white bg-blue-500 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							投票する
						</button>
					</li>
					<li>
						<p className="text-2xl text-blue-500 font-bold">リンク</p>
						<DiscordButton text="Discord" url={"discordAuthURL"} />
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
