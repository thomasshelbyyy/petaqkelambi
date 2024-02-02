import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getData } from "@/lib/fetch/service"
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { getServerSession } from "next-auth"
import Image from "next/image"
import RateModal from "./Modal"
import EditReviewModal from "./EditModal"
import ReviewsComponent from "./ReviewsComponent"
import AddToCartButton from "./AddToCartButton"
import DeleteReviewButton from "./DeleteReviewButton"

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Kalikan dengan 1000 karena timestamp dihitung dalam milidetik

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tambahkan 1 karena bulan dimulai dari 0
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
}

const ProductDetail = async ({ params }) => {
    const getProduct = await getData(`http://localhost:3000/api/products?id=${params.id}`)
    const product = getProduct.data

    const getReviews = await getData(`http://localhost:3000/api/review?product_id=${params.id}`)
    const reviews = getReviews.data || []

    const session = await getServerSession(authOptions)

    let transactions = []
    let otherUsersReview = []
    let loggedInUserReview = {}
    if (session?.user) {
        transactions = await getData(`http://localhost:3000/api/transaction?user_id=${session.user.id}`)

        otherUsersReview = reviews.filter(review => review.user_id !== session.user.id) || []
        loggedInUserReview = reviews.find(review => review.user_id === session.user.id) || []
    }



    const sumRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = sumRating / reviews.length
    const succeedTransactions = transactions.length > 0 ? transactions.data.filter(transaction => transaction.status === "settlement") : []

    return (
        <main className="w-screen flex flex-col items-center py-4 bg-gray-300">
            <div className="flex flex-col md:flex-row justify-center w-11/12 p-8 rounded-lg bg-white">
                {/* <!-- UTNUK FOTO PROUUK --> */}
                <div className="md:w-1/2">
                    <Image height={100} width={100} alt={product.name} src={product.image} className="rounded-lg md:max-w-lg w-11/12" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
                    <div className="flex my-4">
                        <div className="flex gap-1 ">

                            {[1, 2, 3, 4, 5].map(i => (
                                <StarIcon key={i} className={`w-6 ${i <= averageRating ? "text-yellow-400" : ""}`} />
                            ))}

                        </div>
                        <p className="text-gray-800">{reviews.length} Reviews</p>
                    </div>
                    <p className="text-gray-700 font-medium px-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Quidem
                        esse vero nemo ipsa sapiente aut culpa repudiandae autem explicabo vel officia enim, harum facere
                        velit tempore delectus, quam ducimus, deleniti quisquam. Officia, praesentium ipsam enim suscipit
                        perferendis soluta! Animi nobis, tenetur inventore aut optio omnis ullam incidunt obcaecati
                        veritatis quaerat fuga iusto vel neque? Nostrum possimus pariatur nihil nobis repudiandae adipisci
                        distinctio veritatis illo magni iusto! Voluptatum distinctio incidunt consequatur facilis quam.
                        Quasi, aperiam impedit magni qui voluptatum iure pariatur.</p>
                    <div className="flex gap-3 text-white mt-3">
                        <button className="p-2 rounded-full bg-red-400">
                            <HeartIcon className="w-6" />
                        </button>
                        <AddToCartButton
                            productId={params.id}
                            productName={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    </div>
                </div>
            </div>

            <div className="w-11/12 mt-5 bg-white rounded-lg p-8">

                {session?.user && loggedInUserReview.hasOwnProperty("product_id") ? (
                    <div className="py-4 px-8 bg-gray-200 border border-gray-400 rounded-lg max-w-2xl">
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <p className="font-medium text-gray-800">{loggedInUserReview.username}</p>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(icon => (
                                    <StarIcon key={icon} className={`w-6 ${icon <= loggedInUserReview.rating ? "text-yellow-300" : ""}`} />
                                ))}
                            </div>
                        </div>

                        <p className="my-3">{loggedInUserReview.review}</p>
                        <div className="flex justify-between">
                            <div className="flex">
                                <EditReviewModal
                                    userId={session.user.id}
                                    username={session.user.username}
                                    productId={params.id}
                                    productName={product.name}
                                    oldRating={loggedInUserReview.rating}
                                    oldReview={loggedInUserReview.review}
                                    reviewId={loggedInUserReview.id}
                                />
                                <DeleteReviewButton reviewId={loggedInUserReview.id} />
                            </div>
                            <p>{timestampToDate(loggedInUserReview.date.seconds)}</p>
                        </div>
                    </div>
                ) : (
                    <RateModal
                        userId={session.user.id}
                        username={session.user.username}
                        productId={params.id}
                        productName={product.name}
                    />
                )}
                <ReviewsComponent reviews={reviews} />
            </div>
        </main>
    )
}
export default ProductDetail