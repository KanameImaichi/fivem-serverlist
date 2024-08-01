"use client";
import Modal from "@/components/elements/modal";
import Toast from "@/components/elements/toast";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

type ApiResponse = {
	message?: string;
};
export default function authUser() {
	const [state, setState] = useState({ state: "standby", messages: "" });
	const [isOpen, setIsOpen] = useState(false);
	const [authCode, setAuthCode] = useState<string>();
	const authUser = async () => {
		setState({ state: "loading", messages: "" });
		const res = await fetch("/api/users/auth", {
			method: "POST",
			body: JSON.stringify({ auth_code: authCode }),
		});
		const responseBody: ApiResponse | null = await res.json().catch(() => null);
		if (!responseBody?.message) return;
		if (res.status === 200) {
			setState({ state: "success", messages: "" });
		} else {
			console.log(res);
			setState({ state: "failed", messages: responseBody.message });
			setIsOpen(true);
		}
	};
	return (
		<>
			<div className="w-4/12 mx-auto mt-48">
				<p className="text-3xl text-blue-500 font-bold text-start">
					FivemとDiscordアカウントを紐づける
				</p>
				<p className="mt-6 text-blue-500">認証コードを入力してください。</p>
				<div className="w-full mt-6">
					<form className="w-full">
						<button
							type="button"
							onClick={() => signIn("cfx", { redirectTo: "/dashboard" })}
							className={
								"mt-12 bg-blue-700 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
							}
						>
							Fivemでログインする
						</button>
					</form>
				</div>
			</div>
			{state.state === "loading" && (
				<Toast message="ロード中">
					<div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent" />
				</Toast>
			)}
			{state.state === "success" && (
				<Toast message="処理が完了しました！">
					<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
						</svg>
						<span className="sr-only">Check icon</span>
					</div>
				</Toast>
			)}
			{state.state === "failed" && (
				<>
					<Modal open={isOpen} onClose={() => setIsOpen(false)} />
				</>
			)}
		</>
	);
}
