"use client"

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function DeleteReviewButton({ reviewId }) {
    const baseUrl = process.env.BASE_URL

    const router = useRouter()
    const handleClick = async () => {
        const res = await fetch(`${baseUrl}api/review/delete`, {
            method: "DELETE",
            body: JSON.stringify({ reviewId })
        })

        const response = await res.json()

        if (res.ok) {
            alert("review deleted")
            router.refresh()
        } else {
            alert(response.message)
        }
    }
    return (
        <Button className="bg-red-500 ml-3" onClick={handleClick}>Delete</Button>
    )
}