import { type Prisma, PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Discord,
		{
			id: "cfx",
			name: "cfx",
			type: "oidc",
			version: "2.0",
			wellKnown: "https://idms.fivem.net/connect",
			params: { grant_type: "authorization_code" },
			issuer: "https://idms.fivem.net",
			authorization: { params: { scope: "openid identify" } },
			clientId: "txadmin_test",
			clientSecret: "txadmin_test",
			async profile(profile, tokens) {
				const res = await fetch("https://idms.fivem.net/connect/userinfo", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${tokens.access_token}`,
					},
				});
				const account = await res.json();
				return { name: account.name };
			},
		},
	],
	callbacks: {
		async jwt({ token, user, account, profile, trigger }) {
			if (!account) {
				return token;
			}
			if (account.provider === "discord") {
				const res = await prisma.user.findUnique({
					where: {
						discordId: account.providerAccountId,
					},
					select: {
						discordId: true,
					},
				});
				token.isAuthed = !!res?.discordId;
				token.discordId = account.providerAccountId;
			} else {
				// 	紐づけ処理を行う。
				const session = await auth();
				if (!session?.user?.name) return;
				const user = await prisma.user.findUnique({
					where: {
						discordId: session.user.id,
					},
				});
				if (!user) {
					const data: Prisma.UserCreateInput = {
						discordId: session.user.id,
						fivemId: token?.name,
					};
					const newUser = await prisma.user.create({
						data: data,
					});
				}
				token.user = session.user;
				token.isAuthed = session.user.isAuthed;
				token.discordId = session.user.id;
			}
			return token;
		},
		async session({ session, token, user }) {
			// @ts-ignore
			session.user = token.user;
			// @ts-ignore
			return session;
		},
	},
});
