import { Suspense } from "react";
import LoginComponent from "./LoginComponent";

export const metadata = {
    title: "Petaqkelambi | Login"
}

function Loading() {
    return <h1>Loading...</h1>
}

export default function LoginPage() {
    return (
        <Suspense fallback={<Loading />}>
            <LoginComponent />
        </Suspense>
    )
}