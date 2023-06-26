/**
 * CourseCreator App
 * 
 * React + Vite
 * Generador de micro cursos con motor ChatGPT 3.5
 * Modelo de ChatGpt: text-davinci-003
 * Permite generar un micro curso con 10 temas, cada tema contiene
 * un resumen, cuestionario de 5 preguntas de opción múltiple (la opticón correcta es indicada)
 * y una reflexión del tema
 * 
 * @version React 18.2.0
 * @version Vite 4.3.9
 * @author Ing. Miguel Portilla <jportilla@friedman.com.mx>
 * @copyright TFG - Desarrollo (2023)
 */
// React
import { useState } from 'react'

// Providers
import { MicroCoursePDFProvider } from './providers/MicroCoursePDFProvider'
import { TokenCountProvider } from './providers/TokenCountProvider'

import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import { PromptInput } from './components/PromptInput.jsx'

const CourseCreatorApp = () => {

  const [ userPrompt, setUserPrompt ] = useState( '' )

  const onSetPrompt = ( newPrompt ) => {
    if( userPrompt.includes( newPrompt ) ) return

    setUserPrompt( newPrompt )
  }

  return (
    <MicroCoursePDFProvider>
      <TokenCountProvider>
          <PromptInput
            onNewPrompt={ ( value ) => onSetPrompt( value ) }
          />
      </TokenCountProvider>
    </MicroCoursePDFProvider>
  )
  
}

export default CourseCreatorApp
