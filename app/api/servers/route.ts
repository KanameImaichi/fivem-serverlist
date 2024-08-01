import { auth, prisma } from "@/app/auth";
import removeCaretAndNumber from "@/utils/removeCaretAndNumber";
import { NextResponse } from "next/server";

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
	console.log(user);
	console.log(jsonReq.id);
	const res = await fetch(
		`https://servers-frontend.fivem.net/api/servers/single/${jsonReq.id}`,
	);
	const jsonRes = await res.json();

	if (jsonRes.Data.ownerName !== user.fivemId) {
		return NextResponse.json(
			{ message: `${jsonRes.Data.ownerName}でログインしてください` },
			{ status: 403 },
		);
	}
	const server = await prisma.server.create({
		data: {
			id: jsonReq.id,
			name: removeCaretAndNumber(jsonRes.Data.vars.sv_projectName),
			ownerDiscordId: user.discordId,
			subtitle: jsonRes.Data.vars.sv_projectDesc,
			description: "",
			image_url: "",
		},
	});
	return NextResponse.json({ server }, { status: 200 });
}
