import type { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			isAuthed: boolean;
		} & DefaultSession["user"];
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		isAuthed: boolean;
		discordId: string;
	}
}
