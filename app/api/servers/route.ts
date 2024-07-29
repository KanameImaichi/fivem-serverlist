import { auth, prisma } from "@/app/auth";
import { fetchStreamData } from "@/utils/readerStream";
import { NextResponse } from "next/server";
import removeCaretAndNumber from "../../../utils/removeCaretAndNumber";

export async function POST(req: Request) {
	const session = await auth();
	const discordId = session?.user?.id;
	const jsonReq = await req.json();
	console.log(discordId);
	const user = await prisma.user.findUnique({
		where: { discordId: discordId },
	});
	if (!user) {
		return NextResponse.json(
			{ message: "ユーザーが見つかりませんでした。" },
			{ status: 404 },
		);
	}
	const res = await fetchStreamData(
		`https://servers-frontend.fivem.net/api/servers/single/${jsonReq.id}`,
	);

	if (res.Data.ownerName !== user.fivemId) {
		return NextResponse.json(
			{ message: `${res.Data.ownerName}でログインしてください` },
			{ status: 403 },
		);
	}
	const server = await prisma.server.create({
		data: {
			id: jsonReq.id,
			name: removeCaretAndNumber(res.Data.vars.sv_projectName),
			ownerDiscordId: user.discordId,
			subtitle: res.Data.vars.sv_projectDesc,
			description: "",
			image_url: "",
		},
	});
	return NextResponse.json({ server }, { status: 200 });
}
