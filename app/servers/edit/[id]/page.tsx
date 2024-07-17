import Header from "@/components/layouts/header";
import React from "react";

export default function ServerEdit(){
    async function updateServerInfo(formData: FormData) {
        'use server'

        const rawFormData = {
            sererName: formData.get('name'),
            description: formData.get('description')
        }

        // mutate data
        // revalidate cache
    }

    return (
        <div className="h-screen">
            <Header/>
            <div className="flex h-full">
                <div className="w-1/5 border-2">
                    <ul className="mt-8 mx-5">
                        <li>
                            <p className="text-lg">サーバー登録の手順</p>

                        </li>
                    </ul>
                </div>
                <div className="w-1/2 mx-auto">
                    <p className="mt-24 text-5xl text-center">サーバーを編集する</p>
                    <div className="w-full border-2 mt-12">

                        <form className="w-full" >
                            <div className="mb-5">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">サーバーの名前</label>
                                <input type="text" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <div>
                                <label htmlFor="small-input"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small
                                    input</label>
                                <input type="text" id="small-input"
                                       className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">サーバーの説明</label>
                                <input type="text" id="description"
                                       className="block w-full p-4 text-gray-900 border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <button type="button"
                                        className="text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    保存する
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}