import styled from "styled-components"
import categoriesToPreLoad from "../../utils/categories"
import { IProduct } from "@/types"


const Card = ({name, price, description, image, categoryId, stock} : IProduct) => {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F2F2F2] text-black p-4 border 
    rounded-[10px] m-4 max-w-[300xp] w-[300px] h-[500px] min-h-[500px] 
    shadow">
        <img className="w-full max-w-[100px] h-full max-h-[200px]" src={image} alt={image} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <p>Category: {categoriesToPreLoad[categoryId].name}</p>
        <p>Stock: {stock}</p>
    </div>
  )
}

export default Card 