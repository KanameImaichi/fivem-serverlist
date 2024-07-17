import { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import Logo from "./logo";
import {auth} from "@/app/auth";

export default async function Header() {
	const session = await auth()


	return (
		<header className="top-2 z-30 w-full md:top-6 shadow-xl">
			<div>
				<div
					className="flex h-14 items-center justify-between gap-3 bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
					{/* Site branding */}
					<div className="flex flex-1 items-center">
						<Logo/>
					</div>

					{/* Desktop sign in links */}
					<ul className="flex flex-1 items-center justify-end gap-3">
						{session ?
							<li>
								<div className="flex gap-4 ">
									<Link
										href="/dashboard/addserver"
										className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
									>
										サーバーを登録
									</Link>
									<Link href="/dashboard">
										<Image src={session.user?.image} alt="user_image" width={50} height={50} />
									</Link>
								</div>

							</li>
							:
							<li>
								<Link
									href="/login"
									className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
								>
									Login
								</Link>
							</li>}


					</ul>
				</div>
			</div>
		</header>
	);
}
