import { auth } from "@/app/auth";
import React from "react";

export default async function Dashboard() {
	const session = await auth();
	return (
		<div className="w-full ">
			<div className="bg-blue-400 ">
				<p className="text-4xl py-32">こんにちは！{session?.user?.name}さん</p>
			</div>
			<div>サーバーの登録をしよう！</div>
		</div>
	);
}
