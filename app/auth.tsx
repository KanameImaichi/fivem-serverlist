import NextAuth, {NextAuthConfig} from "next-auth"
import Discord from "next-auth/providers/discord";

export const publicRoutes = ['/'];
export const authRoutes = ['/login', '/register'];
export const DEFAULT_LOGIN_REDIRECT = '/';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Discord],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }

                return true;
            }

            if (!isPublicRoute && !isLoggedIn) {
                return false;
            }

            return true;
        },
    },
})
