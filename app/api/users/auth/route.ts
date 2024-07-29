import { auth, prisma } from "@/app/auth";
// biome-ignore lint/style/useImportType: <explanation>
import { type Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const session = await auth();
	console.log(session);
	if (!session || !session.user.id) {
		return NextResponse.json(
			{ message: "認証されていません。" },
			{ status: 401 },
		);
	}
	const req = await request.json();
	// ユーザー認証は一度のみできる。
	const user = await prisma.user.findUnique({
		where: {
			discordId: session.user.id,
		},
	});
	if (user) {
		return NextResponse.json(
			{ message: "アカウントが既に存在します。" },
			{ status: 409 },
		);
	}
	const token = await prisma.token.findFirst({
		where: {
			token: req.auth_code,
			expire_at: {
				gte: new Date(),
			},
		},
		select: {
			fivemId: true,
		},
	});
	if (!token) {
		return NextResponse.json(
			{ message: "入力した認証コードは無効です。" },
			{ status: 404 },
		);
	}
	const data: Prisma.UserCreateInput = {
		discordId: session.user.id,
		fivemId: token.fivemId,
	};
	const newUser = await prisma.user.create({
		data: data,
	});
	return NextResponse.json({ newUser }, { status: 200 });
}
