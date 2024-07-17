"use client"
import Header from "@/components/layouts/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import React, {useState} from "react";

export default function AddServer(){

    const [state,setState] = useState({state:"standby",messages:""})
    const addServer=async () => {
        console.log(state)
        setState({state:"loading",messages:""})
        const res = await fetch("/api/servers/register")
        if (res.status ===200){
            setState({state:"success",messages:""})
        }else{
            setState({state:"standby",messages:res.body.message})
        }
    }
    return (
        <div className="h-screen ">
            <Header/>
            <div className="flex h-full">
                <div className="w-1/5 border-2">
                    <ul className="mt-8 mx-5">
                        <li>
                            <p className="text-lg">Fivemと連携する</p>
                            <p>Fivemと連携することで投票を行うことができるようになります。</p>
                        </li>
                    </ul>
                </div>
                <div className="w-1/2 mx-auto">
                    <p className="mt-24 text-5xl text-center">サーバーを登録する</p>
                    <div className="w-full border-2 mt-12">

                        <form className="w-full">
                            <div>
                                <label htmlFor="server-address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    サーバーのアドレス
                                </label>
                                <input type="text" id="server-address"
                                       className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <div>
                                <label htmlFor="server-port-number"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    サーバーのポート番号
                                </label>
                                <input type="text" id="server-port-number"
                                       className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>

                            <button type="button" onClick={() => alert("test")}
                                    className={"text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-gray-300"}>
                                登録する
                            </button>
                        </form>
                        <button onClick={()=>alert("test")}>Click me</button>
                    </div>
                </div>
            </div>
            {state.state === "loading" &&
                <div id="toast-success"
                     className="absolute bottom-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                     role="alert">
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
                    <button type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            }
            {state.state === "failed" &&
                <div id="toast-success"
                     className="absolute bottom-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                     role="alert">
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{state.messages}</div>
                    <button type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            }
        </div>
    )
}