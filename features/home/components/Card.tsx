import img from "@/public/images/img.png";
import img_1 from "@/public/images/img_1.png";
import Image from "next/image";
import Link from "next/link";
import {fetchStreamData} from "@/utils/readerStream";
const Card = async ({ server_id,order }: { server_id: string,order:number }) => {
	const res = await fetchStreamData(`https://servers-frontend.fivem.net/api/servers/single/${server_id}`)
	console.log(res)
	const clients = res.Data.clients
	const serverName = res.Data.vars.sv_projectName


	return (
		<Link href={`/servers/${server_id}`}>
			<div className="max-w-sm rounded-xl overflow-hidden shadow-lg relative">
				<div className="absolute top-0 left-0 z-50 bg-blue-500 rounded-3xl w-14 text-white font-bold text-center">
					{order+1}位
				</div>
				<Image src={img} alt="Card" />
				<div className="px-6 pt-2">
					<span className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
						#photography
					</span>
					<span className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
						#travel
					</span>
					<span className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
						#winter
					</span>
				</div>
				<div className="px-6 flex">
					<Image
						src={img_1}
						alt={"asss"}
						width={50}
						height={50}
						style={{ objectFit: "scale-down" }}
					/>
					<div>
						<div className="font-bold text-xl text-blue-600">
							{serverName}
						</div>
						<p className="text-sm text-gray-700">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Voluptatibus
						</p>
						<div className="">
							<button
								type="button"
								className="my-2 px-5 py-3 text-base font-semibold text-center text-white bg-blue-500 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
							>
								このサーバーに参加する
							</button>
						</div>
					</div>
				</div>
				<div className="p-1.5 bg-emerald-100 text-sm font-bold flex text-white justify-end">
					<p>プレーヤー {clients}</p>
					<p>更新日</p>
				</div>
			</div>
		</Link>
	);
};
export default Card;
