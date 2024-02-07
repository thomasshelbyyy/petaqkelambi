import { Suspense } from "react";
import RegisterComponent from "./RegisterComponent";

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