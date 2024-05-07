'use client'

import { getOrders } from "@/helpers/orders.helper";
import { IOrder, IProduct, userSession } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Orders = () => {
  const [token, setToken] = useState<userSession>()
  const [orders, setOrders] = useState<IOrder[]>();
  

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem('userSession');
      setToken(JSON.parse(userToken!))
      !userToken && redirect("/login")
    }
    
  }, [])

  useEffect(() => {
    async function getData() {
      try {
        const response = await getOrders(token?.token!)
        setOrders(response)
      } catch (error: any) {
        throw new Error(error)
      }
    };
    token && getData()
  }, [token])
 
  

  console.log(orders)
  return (
    <div>
    {
            orders?.length! > 0 ? (
              orders?.map((el) => {
                return (
                  <div key={el.id}>
                    <div>
                      <p>{new Date(el.date).toLocaleString()}</p>
                      <p>Status: {el.status}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>No realizaste ninguna orden, aún!</div>
            )
          }
    </div>
  )
}

export default Orders