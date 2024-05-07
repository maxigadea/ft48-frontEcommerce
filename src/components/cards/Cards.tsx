import { IProduct } from "@/types";
import Card from "../card/Card"
import styled from 'styled-components';
import Link from "next/link";


const Cards = ({ products } : { products: IProduct[] }) => {
  return (
    <div className="flex justify-center items-center flex-wrap">
        {
            products?.map((product) => {
                return (
                  <Link href={`/product/${product.id}`} key={product.name}>
                    <Card key={product.name} {...product} />
                  </Link>
                )
            })
        }
    </div>
  )
}

export default Cards