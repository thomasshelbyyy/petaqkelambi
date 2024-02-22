import { Suspense } from "react";
import RegisterComponent from "./RegisterComponent";

export const metadata = {
    title: "Petaqkelambi | Register"
}

function Loading() {
    return (
        <h1>Loading...</h1>
    )
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<Loading />}>
            <RegisterComponent />
        </Suspense>
    )
}