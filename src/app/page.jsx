import Link from "next/link"

export const metadata = {
  title: "Home | Petaqkelambi"
}
const Home = () => {
  return (
    <div className="w-screen h-screen flex gap-8 justify-center items-center">
      <Link href="/product/male" className="w-64 h-80 bg-gray-400 rounded-lg flex flex-col justify-end pb-4 px-8 hover:scale-110 transition duration-300 relative z-20 opacity-95 text-white before:absolute before:bg-[url('/man.jpg')] before:bg-cover before:top-0 before:left-0 before:bottom-0 before:right-0 before:opacity-50 before:-z-10">
        <p className="px-3 py-1 rounded-full bg-white text-sm text-gray-800 font-semibold w-fit">Male</p>
      </Link>
      <Link href="/product/female" className="w-64 h-80 bg-red-400 rounded-lg flex flex-col justify-end pb-4 px-8 hover:scale-110 transition duration-300 relative z-20 opacity-95 text-white before:absolute before:bg-[url('/woman.jpg')] before:bg-cover before:top-0 before:left-0 before:bottom-0 before:right-0 before:opacity-50 before:-z-10">
        <p className="px-3 py-1 rounded-full bg-white text-sm text-gray-800 font-semibold w-fit">Female</p>
      </Link>
      <Link href="/product/kid" className="w-64 h-80 bg-sky-400 rounded-lg flex flex-col justify-end pb-4 px-8 hover:scale-110 transition duration-300 relative z-20 opacity-95 text-white before:absolute before:bg-[url('/kid.jpg')] before:bg-cover before:top-0 before:left-0 before:bottom-0 before:right-0 before:opacity-50 before:-z-10">
        <p className="px-3 py-1 rounded-full bg-white text-sm text-gray-800 font-semibold w-fit">Kid</p>
      </Link>
    </div>
  )
}

export default Home