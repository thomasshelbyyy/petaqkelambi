"use client"

import { StarIcon } from "@heroicons/react/24/solid"
import { Label, Select } from "flowbite-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Kalikan dengan 1000 karena timestamp dihitung dalam milidetik

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tambahkan 1 karena bulan dimulai dari 0
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
}

export default function ReviewsComponent({ reviews }) {
    const [starFilter, setStarFilter] = useState("all")
    const [filteredReviews, setFilteredReviews] = useState(reviews)

    useEffect(() => {
        if (starFilter === "all") {
            setFilteredReviews(reviews)
        } else {
            setFilteredReviews(reviews.filter(review => review.rating == starFilter))
        }
        console.log({ starFilter })
    }, [starFilter, reviews])

    return (
        <>
            <h2 className="mt-4 text-xl font-semibold">Reviews</h2>

            <Label htmlFor="filter" value="filter by :" />
            {/* <p className="font-semibold">filter by :</p> */}

            <Select className="w-32 my-3" id="filter" onChange={(e) => setStarFilter(e.target.value)} required>
                <option value="all" >All Ratings</option>
                <option value="5">
                    5 stars
                </option>
                <option value="4">
                    4 stars
                </option>
                <option value="3">
                    3 stars
                </option>
                <option value="2">
                    2 stars
                </option>
                <option value="1">
                    1 star
                </option>
            </Select>
            {/* <select onChange={(e) => setStarFilter(e.target.value)}>
                <option value="all" >All Ratings</option>
                <option value="5">
                    5 stars
                </option>
                <option value="4">
                    4 stars
                </option>
                <option value="3">
                    3 stars
                </option>
                <option value="2">
                    2 stars
                </option>
                <option value="1">
                    1 star
                </option>
            </select> */}

            <div className="flex flex-col gap-4">
                {filteredReviews.length > 0 ? filteredReviews.map(review => (
                    <div key={review.username} className="py-4 px-8 bg-gray-300 rounded-lg max-w-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <Image width={100} height={100} alt="user image" src="/photo.jpg" className="w-8 h-8 rounded-full mr-3" />
                                <p className="font-medium text-gray-800">{review.username}</p>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(icon => (
                                    <StarIcon key={icon} className={`w-6 ${icon <= review.rating ? "text-yellow-300" : ""}`} />
                                ))}
                            </div>
                        </div>

                        <p className="my-3">{review.review}</p>
                        <p>{timestampToDate(review.date.seconds)}</p>
                    </div>
                ))
                    : (
                        <p>no review for this product</p>
                    )}
            </div>
        </>

    )
}