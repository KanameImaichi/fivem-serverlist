import { NextResponse } from "next/server";

// todo sessionないならunauthorized

export async function POST(req: Request) {
	const formData = new FormData();
	try {
		console.log(process.env.ACCOUNT_ID);
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/images/v2/direct_upload`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.API_TOKEN}`,
				},
				body: formData,
			},
		);

		const cloudflareImages = await response.json();
		console.log(cloudflareImages.result.uploadURL);

		return NextResponse.json(
			{ data: cloudflareImages.result.uploadURL },
			{ status: 200 },
		);
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
}
