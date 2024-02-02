import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const authPath = ["/login", "/register"]

export default async function withAuth(req, next) {
    const pathname = req.nextUrl.pathname
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token && !authPath.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
    }

    if (token) {
        if (authPath.includes(pathname)) {
            return NextResponse.redirect(new URL("/product/male/top", req.url));
        }

        if (token.role !== "admin" && pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/product/male/top", req.url));
        }
    }

    return next();
}
