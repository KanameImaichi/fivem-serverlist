import DiscordButton from "@/components/elements/discordButton";
import Header from "@/components/layouts/header";
import React from "react";
import {auth, signIn} from "@/app/auth";
import {useSession} from "next-auth/react";
import {session} from "@auth/core/lib/actions";

export default function ServerList({params}: { params: { slug: string } }) {
	const {slug} = params;

	return (
		<>
			<Header/>
			<div className="max-w-4xl mx-auto mt-20">
				<p className="text-3xl">ログイン</p>
				<form
					action={async () => {
						"use server"
						await signIn("discord",{redirectUrl:"/dashboard"});
					}}
				>
					<button type="submit">Signin with Google</button>
				</form>
			</div>
		</>
	);
}
