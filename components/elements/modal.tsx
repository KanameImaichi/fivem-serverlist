import error from "@/public/images/error-sign.svg";
import Image from "next/image";
import React from "react";

const Modal = ({
	onClose,
	open,
	message,
}: { onClose: () => void; open: boolean; message: string }) => {
	return open ? (
		<>
			<div className="bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col items-center absolute z-20 px-12">
				<Image src={error} alt="error-sign" />
				<h1 className="text-3xl font-bold mb-5 text-gray-600 mt-12">
					エラーが発生しました
				</h1>
				<p className="text-xl text-gray-500 mb-5">
					リクエストが正常に完了しませんでした。
					<br />
					{message}
				</p>
				<div className="flex mt-auto w-full">
					<button
						type="button"
						className="bg-blue-500 text-white px-8 py-2 mx-auto"
						onClick={() => onClose()}
					>
						閉じる
					</button>
				</div>
			</div>
			<div
				className="fixed bg-black bg-opacity-50 w-full h-full z-10"
				onClick={() => onClose()}
			/>
		</>
	) : (
		<></>
	);
};

export default Modal;
