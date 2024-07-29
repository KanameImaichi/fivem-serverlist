import { prisma } from "@/app/auth";
// biome-ignore lint/style/useImportType: <explanation>
import { type Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const jsonReq = await req.json();
	const createdAt = new Date();
	const expireAt = new Date();
	expireAt.setSeconds(expireAt.getSeconds() + 30);
	const fivemId: string = jsonReq.data.fivemId;

	const data: Prisma.TokenCreateInput = {
		id: "",
		is_used: false,
		token: "",
		fivemId: fivemId,
		created_at: createdAt,
		expire_at: expireAt,
	};
	await prisma.token.create({
		data: data,
	});

	return NextResponse.json({ data }, { status: 200 });
}
