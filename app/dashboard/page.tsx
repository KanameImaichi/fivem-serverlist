import {auth, signIn, signOut} from "@/app/auth";
import Header from "@/components/layouts/header";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import Link from "next/link";

export default async function Dashboard() {
    const session = await auth()
    return (
        <div className="h-screen">
            <Header/>
            <div className="flex h-full">
                <div className="w-1/5 border-2">
                    <ul className="mt-8 mx-5">
                        <li>
                            <p className="text-xl text-blue-600 font-bold">あなたのサーバー</p>
                            <div className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
                                <FontAwesomeIcon icon={faPlus} className="w-10 h-10"/>
                                <p className="text-lg">サーバーを追加する</p>
                            </div>
                        </li>
                        <li>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({redirectTo:"/"})
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex items-center justify-between rounded-lg px-5 py-2.5 text-center mt-6 mb-2 border-2">
                                    <p className="text-lg">ログアウト</p>
                                </button>
                            </form>

                        </li>
                    </ul>
                </div>
                <div className="w-full ">
                    <div className="bg-blue-400 ">
                        <p className="text-4xl py-32">こんにちは！{session?.user?.name}さん</p>

                    </div>
                </div>
            </div>

        </div>
    )
}