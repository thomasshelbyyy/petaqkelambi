"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/lib/firebase/init"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/lib/firebase/service"
import { Label, Textarea } from "flowbite-react"

const genders = ["Male", "Female", "Kid"]
const categories = ["Top", "Bottom", "Shoes", "Hat", "Accessories"]

export default function DashboardProductAddNew() {
  const baseUrl = process.env.BASE_URL
  const { push } = useRouter()

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))
    setSelectedFiles(newFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [name, setName] = useState()
  const [gender, setGender] = useState("Male")
  const [category, setCategory] = useState("Top")
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [errors, setErrors] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!name) {
      newErrors.name = "Please insert Product name"
    }
    if (!gender) {
      newErrors.gender = "please select gender"
    }
    if (!category) {
      newErrors.category = "please select category"
    }
    if (!price) {
      newErrors.price = "please insert price"
    }
    if (!description) {
      newErrors.description = "please write the description"
    }
    if (selectedFiles.length < 1) {
      newErrors.image = "please choose image"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    console.log(description)
  }, [description])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const isFormValid = validateForm()
    if (isFormValid) {
      await uploadImage(selectedFiles[0])
      const storageRef = ref(storage, `/image/${selectedFiles[0].name}`)
      const productData = {
        name,
        gender,
        category,
        price: parseInt(price),
        description,
        image: await getDownloadURL(storageRef)
      }

      try {
        const res = await fetch(`${baseUrl}/api/products/add`, {
          method: "POST",
          body: JSON.stringify(productData)
        })

        if (res.status) {
          setIsLoading(false)
          push('/dashboard/product')
        } else {
          setIsLoading(false)
          alert("failed to add product")
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    } else {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <h1 className="text-lg font-semibold text-indigo-300 mb-4">Add new product</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>

        <div className="mb-5">
          <label htmlFor="name" className={`block mb-2 text-sm font-medium text-white ${errors.name && "text-red-700 dark:text-red-500"}`}>Product Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.name && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} placeholder="example:new shoes" />
          {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-white">Select The Gender</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.gender && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`}>
            {genders.map((gend, i) => (
              <option value={gend} key={i}>{gend}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Select The Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.category && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`}>
            {categories.map((categ, i) => (
              <option value={categ} key={i}>{categ}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Price</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              Rp
            </span>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.price && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} />
          </div>
          {errors.price && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errors.price}</p>}
        </div>

        <div className="mb-5">
          <div {...getRootProps()}>

            <label className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white px-3 py-2 rounded-md cursor-pointer bg-gray-400 ${errors.image && "border-red-500 text-red-700"}`} htmlFor="product_image">Click here to choose image!</label>
            <input accept="image/*" {...getInputProps()} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="product_image" type="file" />
            {errors.image && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errors.image}</p>}
          </div>
          {selectedFiles.length > 0 && selectedFiles.map(file => (
            <div key={file.name}>
              <Image src={file.preview} alt={file.name} width={100} height={100} className="w-24" />
            </div>
          ))}
        </div>

        <div className="mb-5">
          <Label htmlFor="description" className="block mb-2 text-sm font-medium text-white" value="Description" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.description && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"}`} />
          {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errors.description}</p>}
        </div>

        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>

  )
}