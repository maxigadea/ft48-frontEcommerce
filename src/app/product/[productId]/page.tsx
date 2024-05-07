'use client'
import { getProductById } from "@/helpers/product.helper"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IProduct, userSession } from "@/types"


const DetailProduct = ({ params } : {params: {productId: string}}) => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<userSession>()
  const [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductById(params.productId)
      setProduct(product)
    }
    fetchData()
   
    if(typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem('userSession');
      setUserSession(JSON.parse(userToken!))
    }
  }, [])

  console.log(userSession, product)
  

  const handleBuy = () => {
    if(!userSession) {
      alert("Debes estar logeado para poder agregar productos al carrito")
      router.push("/login")
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      cart.push(product)
      localStorage.setItem("cart", JSON.stringify(cart))
      alert("Se agregó el producto a tu carrito")
      router.push("/cart")
    }
  }

  return (
    <div className="w-full items-center justify-center flex flex-col">
      <div className="w-1/2 items-center justify-center flex flex-col bg-gray-200 p-4 rounded" >
        <h2>{product?.name}</h2>
        <img src={product?.image} alt="imagendelproduct" width={100} height={100} />
        <p>{product?.description}</p>
        <p>Price: ${product?.price}</p>
        <p>Stock: {product?.stock}</p>
        <button onClick={handleBuy} className="rounded-sm bg-white hover:bg-gray-400 text-black p-4 mt-2">Add to cart</button>
      </div>
    </div>
  )
}

export default DetailProduct