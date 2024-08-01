import { auth, prisma, signOut } from "@/app/auth";
import Header from "@/components/layouts/header";
import Link from "next/link";
import type React from "react";
import { Provider } from "../../contexts/isAuthed";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();
	if (!session?.user?.name) return;
	const res = await prisma.user.findUnique({
		where: {
			discordId: session?.user.id,
		},
		select: {
			servers: true,
		},
	});
	const servers = res?.servers;
	return (
		<Provider user={{ name: "shibukawa", email: "shibukawa@example.com" }}>
			<div className="h-screen relative">
				<Header />
				<div className="flex h-full">
					<div className="w-1/6 border-2">
						<ul className="mt-8 mx-5">
							<li>
								<p className="text-xl text-blue-600 font-bold">
									あなたのサーバー
								</p>
								{session.user?.isAuthed ? (
									servers?.length !== 0 ? (
										<div>
											<Link href="/dashboard/servers">
												<div className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
													<p>サーバーを管理</p>
												</div>
											</Link>
											<Link href="/dashboard/addserver">
												<div className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
													<p>サーバーを追加</p>
												</div>
											</Link>
										</div>
									) : (
										<div>
											<p className="text-gray-600">
												まだサーバーが登録されていないようです。
												<Link
													href="/dashboard/addserver"
													className="text-blue-600"
												>
													登録する
												</Link>
											</p>
										</div>
									)
								) : (
									<div>
										<p className="text-gray-600">
											先にユーザーの認証をしてください。
											<Link
												href="/dashboard/authuser"
												className="text-blue-600"
											>
												認証する
											</Link>
										</p>
									</div>
								)}
							</li>
							<li>
								<p className="text-xl text-blue-600 font-bold">アカウント</p>
								<Link href="/dashboard">
									<div className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
										<p>ダッシュボード</p>
									</div>
								</Link>
								{!session.user?.isAuthed && (
									<Link href="/dashboard/authuser">
										<div className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
											<p>ユーザー認証</p>
										</div>
									</Link>
								)}

								<form
									action={async () => {
										"use server";
										await signOut({ redirectTo: "/" });
									}}
								>
									<button
										type="submit"
										className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2"
									>
										<p className="text-lg">ログアウト</p>
									</button>
								</form>
							</li>
						</ul>
					</div>
					{children}
				</div>
			</div>
		</Provider>
	);
}
