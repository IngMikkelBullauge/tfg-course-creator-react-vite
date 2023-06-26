import { useState, useEffect } from 'react'

export const useMicroCoursePrice = ( price ) => {
  const [ priceTokens, setPriceTokens ] = useState( 0 )

  const processPrice = () => {
    setPriceTokens( priceTokens + price )
  }
  
  useEffect( () => {
    processPrice()
  }, [] )
  
  return {
    priceTokens
  }
}
