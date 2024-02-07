"use client"

import { StarIcon } from "@heroicons/react/24/solid"
import { Button, Modal } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditReviewModal({ reviewId, userId, username, productId, productName, oldRating, oldReview }) {
    const baseUrl = process.env.BASE_URL
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(oldRating)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [review, setReview] = useState(oldReview)

    const router = useRouter()

    const handleStarClick = star => {
        setRating(star)
    }

    const handleModalClose = () => {
        setReview(oldReview)
        setRating(oldRating)
        setHoveredRating(oldRating)
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            reviewId, rating, review
        }

        try {
            const res = await fetch(`${baseUrl}/api/review/update`, {
                method: "PUT",
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (res.ok) {
                router.refresh()
                setShowModal(false)
            } else {
                alert(result.message)
            }
        } catch (error) {
            alert("failed to update review" + error)
        }
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Edit your review</Button>
            <Modal show={showModal} onClose={handleModalClose}>
                <Modal.Header>Edit your review for {productName}</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className="my-3">
                                <h3 className="text-xl font-semibold text-gray-700">Rating</h3>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <StarIcon
                                            key={star}
                                            className={`w-8 h-8 cursor-pointer ${star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-700"}`}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            onClick={() => handleStarClick(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="max-w-sm">
                                    <label htmlFor="review" className="block mb-2 text-xl font-semibold text-gray-700">Your review</label>
                                    <textarea value={review} onChange={(e) => setReview(e.target.value)} id="review" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your review..."></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Submit</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}