"use client";
import React, { useState } from "react";

const ServerEditModal = ({
	onClose,
	open,
	id,
	name,
	description,
	subtitle,
	image,
}: {
	onClose: () => void;
	open: boolean;
	id: string;
	name: string;
	description: string;
	subtitle: string;
	image: string;
}) => {
	// todo image 名前帰る
	const [file, setFile] = useState<File>();
	const [generatedUrl, setGeneratedUrl] = useState(image);
	const [serverName, setServerName] = useState(name);
	const [serverDescription, setServerDescription] = useState(description);
	const [serverSubtitle, setServerSubtitle] = useState(subtitle);
	const rows = 8;
	const uploadImage = async () => {
		const formData = new FormData();
		// @ts-ignore
		formData.append("file", file);
		const cloudflareResponse = await fetch(generatedUrl, {
			method: "POST",
			body: formData,
		});
		const res = await cloudflareResponse.json();
		return res.result.variants[0];
	};
	const generateUrl = async () => {
		const responseUploadURL = await fetch("/api/image", {
			method: "POST",
		});
		const dataUploadURL = await responseUploadURL.json();
		setGeneratedUrl(dataUploadURL.data);
	};
	const submitServerProfile = async () => {
		let uploadedUrl = image;
		if (file) {
			uploadedUrl = await uploadImage();
		}
		const res = await fetch(`/api/servers/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				name: serverName,
				description: serverDescription,
				subtitle: serverSubtitle,
				image_url: uploadedUrl,
			}),
		});
		if (res.status === 200) {
			onClose();
		}
	};

	return open ? (
		<>
			<div className="bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col items-center absolute z-20 px-12 w-4/12">
				<p className="text-3xl text-blue-500 font-bold text-start">
					サーバーを編集する
				</p>
				<div className="w-full mt-12">
					<form className="w-full">
						<div className="mt-4">
							<label
								htmlFor="server-name"
								className="block mb-2 text-lg font-bold text-blue-600"
							>
								サーバー名
							</label>
							<input
								type="text"
								id="server-name"
								placeholder="サーバー名"
								className="block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
								defaultValue={serverName}
								onChange={(e) => setServerName(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<label
								htmlFor="server-name"
								className="block mb-2 text-lg font-bold text-blue-600"
							>
								サーバーのサブタイトル
							</label>
							<input
								type="text"
								id="server-name"
								placeholder="サブタイトル"
								className="block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
								defaultValue={serverSubtitle}
								onChange={(e) => setServerSubtitle(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<label
								htmlFor="server-description"
								className="block mb-2 text-lg font-bold text-blue-600"
							>
								サーバーの説明
							</label>
							<textarea
								rows={rows}
								id="server-description"
								placeholder="サーバーの説明"
								className="resize-none block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
								defaultValue={serverDescription}
								onChange={(e) => setServerDescription(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<label
								htmlFor="server-image"
								className="block mb-2 text-lg font-bold text-blue-600"
							>
								サーバーの画像
							</label>
							<input
								className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="server-image"
								onChange={(e) => {
									generateUrl();
									// @ts-ignore
									setFile(e.target.files[0]);
								}}
								type="file"
							/>
						</div>

						<button
							type="button"
							className={
								"mt-12 bg-blue-700 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
							}
							onClick={() => submitServerProfile()}
						>
							保存する
						</button>
					</form>
				</div>
			</div>
			<button
				type="button"
				className="absolute bg-black bg-opacity-50 w-full h-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				onClick={() => onClose()}
			/>
		</>
	) : (
		<></>
	);
};

const ServerEditModalContainer = ({
	id,
	name,
	description,
	subtitle,
	image,
}: {
	id: string;
	name: string;
	description: string;
	subtitle: string;
	image: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<button
				type="button"
				className="text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				onClick={handleOpen}
			>
				編集する
			</button>
			<ServerEditModal
				open={open}
				onClose={handleClose}
				id={id}
				key={id}
				name={name}
				description={description}
				subtitle={subtitle}
				image={image}
			/>
		</>
	);
};
export default ServerEditModalContainer;
