import { auth, prisma } from "@/app/auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	const session = await auth();
	const discordId = session?.user?.id;
	console.log(discordId);
	const user = await prisma.user.findUnique({
		where: { discordId: discordId },
		select: {
			discordId: true,
		},
	});
	console.log(user);
	if (!user) {
		return NextResponse.json(
			{ message: "ユーザーが見つかりませんでした。" },
			{ status: 404 },
		);
	}
	const req = await request.json();
	console.log(req);
	const server = await prisma.server.update({
		where: {
			id: req.id,
		},
		select: {
			name: true,
			description: true,
			image_url: true,
		},
		data: {
			name: req.name,
			description: req.description,
			image_url: req?.image_url,
			subtitle: req.subtitle,
		},
	});
	return NextResponse.json({ message: server }, { status: 200 });
}
