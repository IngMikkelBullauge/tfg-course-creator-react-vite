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

export const MicroCoursePDFContext = createContext()

export function MicroCoursePDFProvider( { children } ) {
  const [ globalMicroCoursePDF, setGlobalMicroCoursePDF ] = useState( '' )

  const addMicroCoursePDF = ( text ) => {
    setGlobalMicroCoursePDF( ( prevVal ) => prevVal + text )
  }

  return (
    <MicroCoursePDFContext.Provider value={ { globalMicroCoursePDF, addMicroCoursePDF } }>
      {children}
    </MicroCoursePDFContext.Provider>
  )
}
