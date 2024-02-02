import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

const protectedPaths = ["/dashboard", "/user", "/register", "/login"]

export function middleware(request) {
    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return withAuth(request, () => NextResponse.next())
    }
    return NextResponse.next()
    // const res = NextResponse.next()
    // return res
}

// export default withAuth(mainMiddleware, ["/user/:path*", "/dashboard/:path*", "/login", "/register"])