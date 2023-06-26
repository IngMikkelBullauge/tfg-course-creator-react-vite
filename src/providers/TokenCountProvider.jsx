/**
 * TokenCountProvider
 * 
 * Contexto global que almacena el conteo de tokens del micro curso
 * 
 * @prop: globalTokenCount number( 0 )
 * @prop incrementTokenCount f( number )
 * 
 * @author Ing. Miguel Portilla <jportilla@friedman.com.mx>
 * @copyright TFG - Desarrollo (2023)
 */
import { createContext, useState } from 'react'

export const TokenCountContext = createContext()

export function TokenCountProvider( { children } ) {
  const [ globalTokenCount, setGlobalTokenCount ] = useState( 0 )

  const incrementTokenCount = ( number ) => {
    setGlobalTokenCount( ( prevCount ) => prevCount + number )
  }

  return (
    <TokenCountContext.Provider value={ { globalTokenCount, incrementTokenCount } }>
      {children}
    </TokenCountContext.Provider>
  )
}
