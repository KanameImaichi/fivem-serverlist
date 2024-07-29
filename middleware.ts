import { auth } from "@/app/auth";

const publicRoutes: string[] = [];
const authRoutes: string[] = ["/sign-up", "/sign-in"];
const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT: string = "/";
// @ts-ignore
export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	console.log("pathname", nextUrl.pathname);
	console.log("isLoggedIn", isLoggedIn);
	if (isApiAuthRoute) {
		return null;
	}
	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return null;
	}
	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/login", nextUrl));
	}

	return null;
});

export const config = {
	matcher: ["/dashboard"],
};
