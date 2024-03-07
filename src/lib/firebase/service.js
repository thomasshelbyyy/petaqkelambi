import { Timestamp, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { storage, app } from "./init"
import bcryptjs from "bcryptjs"

const firestore = getFirestore(app)

export async function retrieveData(collectionName) {
    const snapshot = await getDocs(collection(firestore, collectionName))

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return data
}

export async function retrieveDataById(collectionName, id) {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()

    return data
}

export async function retrieveDataByQuery(collectionName, queryValue) {
    const q = query(collection(firestore, collectionName), where("name", "==", queryValue))
    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data
    }))
    return data
}

export async function register(data) {
    const q = query(collection(firestore, "users"), where("email", "==", data.email))
    const snapshot = await getDocs(q)

    const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (users.length > 0) {
        return { status: false, statusCode: 400, message: "Email already taken" }
    } else {
        // data.password = await bcrypt.hash(data.password, 10)
        // data.password = await hash(data.password, 10)
        data.password = await bcryptjs.hash(data.password, 10)
        data.role = "member"

        try {
            await addDoc(collection(firestore, "users"), data)
            return { status: true, statusCode: 200, message: "Register Success" }
        } catch (error) {
            return { status: false, statusCode: 400, message: "Register Failed" }
        }
    }
}

export async function storeProduct(data) {
    const q = query(collection(firestore, "products"), where("name", "==", data.name))
    const snapshot = await getDocs(q)

    const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (products.length > 0) {
        return { status: false, statusCode: 400, message: "Product name already exists" }
    } else {
        try {
            await addDoc(collection(firestore, "products"), data)
            return { status: true, statusCode: 200, message: "Product succesfully added" }
        } catch (error) {
            return { status: false, statusCode: 400, message: "Failed to add product" }
        }
    }
}

export async function login(data) {
    const q = query(collection(firestore, "users"), where("email", "==", data.email))
    const snapshot = await getDocs(q)

    const user = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (user) {
        return user[0]
    } else {
        return null
    }
}

export async function updateUser(userId, data) {
    // CEK JIKA ADA USERNAME YANG SAMA
    const q = query(collection(firestore, "users"), where("username", "==", data.username))
    const snapshot = await getDocs(q)

    const user = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (user.length > 1) {
        console.log(user)
        return { status: false, statusCode: 400, message: "username already taken" }
    } else {
        try {
            const userRef = doc(firestore, "users", userId)
            await updateDoc(userRef, {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                phone: data.phone,
                address: {
                    state: data.address.state,
                    city: data.address.city,
                    street: data.address.street,
                    zipCode: data.address.zipCode
                }
            })
            return { status: true, statusCode: 200, message: "user updated" }
        } catch (error) {
            return { status: false, statusCode: 400, message: "failed to update user: " + error }
        }
    }
}

// PRODUCT SERVICES
export async function uploadImage(imageUpload) {
    const storageRef = ref(storage, `/image/${imageUpload.name}`)

    try {
        await uploadBytes(storageRef, imageUpload)
        alert("image uploaded")
    } catch (error) {
        alert("failed to upload image")
        console.log(error)
    }
}

export async function deleteProduct(id) {
    await deleteDoc(doc(firestore, "products", id))
}

export async function updateProduct(data) {
    try {
        const productRef = doc(firestore, "products", data.id)
        await setDoc(productRef, {
            name: data.name,
            gender: data.gender,
            category: data.category,
            price: data.price,
            image: data.image
        })
        return { status: true, statusCode: 200, message: "product updated" }
    } catch (error) {
        return { status: false, statusCode: 400, message: "Error updating product" }
    }
}

export async function addToCart(productId, userId, name, image, price) {
    // buat collection baru dengan nama carts
    const q = query(collection(firestore, "carts"), where("productId", "==", productId), where("userId", "==", userId))
    const snapshot = await getDocs(q)

    const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (products.length > 0) {
        return { status: false, statusCode: 400, message: "product already in cart" }
    } else {
        try {
            await addDoc(collection(firestore, "carts"), {
                productId: productId,
                userId: userId,
                name: name,
                image: image,
                price: price
            })

            return { status: true, statusCode: 200, message: "product added to cart" }
        } catch (error) {
            return { status: false, statusCode: 400, message: "failed to add product to cart" }
        }
    }
}

export async function removeFromCart(cartId) {
    try {
        await deleteDoc(doc(firestore, "carts", cartId))
        return { status: true, statusCode: 200, message: "product removed from carts" }
    } catch (error) {
        return { status: false, statusCode: 400, message: "failed to delete product from carts" }
    }

}

export async function getAllCarts(userId) {
    const q = query(collection(firestore, "carts"), where("userId", "==", userId))
    const snapshot = await getDocs(q)

    const carts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return carts
}

export async function addtransaction(id, productName, productId, quantity, price, userId, firstName, lastName, phone, email, address, city, zipCode) {
    try {
        await addDoc(collection(firestore, "transactions"), {
            user_id: userId,
            order_detail: {
                order_id: id,
                order_date: Timestamp.fromDate(new Date()),
                product_name: productName,
                product_id: productId,
                quantity: quantity,
                price: price,
                gross_amount: price * quantity
            },
            customer_detail: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                shipping_detail: {
                    city: city,
                    address: address,
                    zip_code: zipCode
                }
            },
            status: "pending"
        })
        return { status: true }
    } catch (error) {
        return { status: false, statusCode: 400, message: "error adding transaction: " + error }
    }
}

export async function updateTransactionStatus(orderId, status) {
    const q = query(collection(firestore, "transactions"), where("order_detail.order_id", "==", orderId))
    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const foundTransaction = data[0]

    try {
        const transactionRef = doc(firestore, "transactions", foundTransaction.id)
        await updateDoc(transactionRef, {
            status: status
        })

        return { status: true, statusCode: 200, message: "transaction status updated" }
    } catch (error) {
        console.log(error)
        return { status: false, statusCode: 400, message: "error updating transaction status: " + error }
    }
}

export async function getTransactionById(userId) {
    const q = query(collection(firestore, "transactions"), where("user_id", "==", userId))
    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    if (data.length > 0) {
        return { status: 200, data }
    } else {
        return { status: 404, message: "transactions not found" }
    }
}

// REVIEW
export async function addReview(productId, productName, userId, username, rating, review) {
    try {
        await addDoc(collection(firestore, "reviews"), {
            product_id: productId,
            product_name: productName,
            user_id: userId,
            username: username,
            rating: rating,
            review: review,
            date: Timestamp.fromDate(new Date())
        })
        return { status: 200, message: "review added succesfully" }
    } catch (error) {
        return { status: 400, message: "failed to add review: " + error }
    }
}

export async function getReviewsById(productId) {
    const q = query(collection(firestore, "reviews"), where("product_id", "==", productId))
    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    if (data.length > 0) {
        return { status: 200, data }
    } else {
        return { status: 404, message: "data not found" }
    }
}

export async function updateReview(reviewId, rating, review) {
    try {
        const userRef = doc(firestore, "reviews", reviewId)
        await updateDoc(userRef, {
            rating: rating,
            review: review,
            date: Timestamp.fromDate(new Date())
        })
        return { status: true, statusCode: 200, message: "review updated" }
    } catch (error) {
        return { status: false, statusCode: 400, message: "failed to update review: " + error }
    }
}

export async function deleteReview(reviewId) {
    try {
        await deleteDoc(doc(firestore, "reviews", reviewId))
        return { status: 200, message: "review deleted" }
    } catch (error) {
        return { status: 400, message: "error deleting review: " + error }
    }
}