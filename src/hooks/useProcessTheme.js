import { useState, useEffect, useContext } from 'react'
import { Configuration, OpenAIApi } from 'openai'

export const useProcessTheme = ( theme ) => {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })
  
  // Evitar error de CORS
  delete configuration.baseOptions.headers[ 'User-Agent' ]
  
  const openai = new OpenAIApi( configuration );
  const [ apiOpenAIResponse, setApiOpenAIResponse ] = useState( '' )
  const [isLoading, setIsLoading] = useState( true )
  const [ numberTokens, setNumberTokens ] = useState( 0 )
  
  const processTheme = async( event ) => {
    try {
      const result = await openai.createCompletion({
        model: import.meta.env.VITE_TOPIC_PROMPT_MODEL,
        prompt: import.meta.env.VITE_TOPIC_START_PROMPT + theme + import.meta.env.VITE_TOPIC_END_PROMPT,
        temperature: parseInt(import.meta.env.VITE_TOPIC_PROMPT_TEMPERATURE),
        max_tokens: parseInt(import.meta.env.VITE_TOPIC_PROMPT_MAX_TOKENS), // Límite de tokens de ChatGPT 3.)5
        top_p: parseInt(import.meta.env.VITE_TOPIC_PROMPT_TOP),
        frequency_penalty: parseInt(import.meta.env.VITE_TOPIC_PROMPT_FRECUENCY_PENALITY),
        presence_penalty: parseInt(import.meta.env.VITE_TOPIC_PROMPT_PRESENCE_PENALITY),
        stream: false,
      })
      console.log( 'response', result )
      setApiOpenAIResponse( result.data.choices[0].text )
      setNumberTokens( result.data.usage.total_tokens )

    } catch ( event ) {
      console.error( event )
      setApiOpenAIResponse( 'Algo salió mal, por favor intente de nuevo' )
    }
    

    // TODO: Para pruebas de desarrollo
    // let numero = Math.floor(Math.random() * 100)
    // setNumberTokens( numero )
    // setApiOpenAIResponse( '\n\nLa violencia laboral es una forma de abuso que se produce en el lugar de trabajo. Esta violencia puede ser física, verbal, psicológica o sexual. Esta violencia puede tener un impacto negativo en la salud mental y física de los trabajadores, así como en la productividad y el rendimiento de la empresa.\n\nPara abordar la violencia laboral, es importante que los empleadores tomen medidas para prevenir la violencia. Esto incluye la creación de un ambiente de trabajo seguro y respetuoso, la implementación de políticas y procedimientos para abordar la violencia laboral, la capacitación de los empleados sobre la violencia laboral y la creación de un sistema de denuncias para los empleados.\n\nAdemás, los empleadores deben tomar medidas para garantizar que los empleados se sientan seguros y respetados en el lugar de trabajo. Esto incluye la creación de una cultura de respeto, la implementación de políticas de igualdad de género, la creación de una cultura de tolerancia cero hacia la violencia laboral y la creación de un sistema de apoyo para los empleados que han sido víctimas de violencia laboral.\n\nFinalmente, los empleadores deben tomar medidas para garantizar que los empleados se sientan seguros y respetados en el lugar de trabajo. Esto incluye la creación de una cultura de respeto, la implementación de políticas de igualdad de género, la creación de una cultura de tolerancia cero hacia la violencia laboral y la creación de un sistema de apoyo para los empleados que han sido víctimas de violencia laboral.\n\nPreguntas de opción múltiple:\n\n1. ¿Cuáles son algunas de las formas de violencia laboral?\na. Física\nb. Verbal\nc. Psicológica\nd. Todas las anteriores\n\nRespuesta correcta: d. Todas las anteriores\n\n2. ¿Qué medidas deben tomar los empleadores para abordar la violencia laboral?\na. Crear un ambiente de trabajo seguro y respetuoso\nb. Implementar políticas y procedimientos para abordar la violencia laboral\nc. Capacitar a los empleados sobre la violencia laboral\nd. Todas las anteriores\n\nRespuesta correcta: d. Todas las anteriores\n\n3. ¿Qué medidas deben tomar los empleadores para garantizar que los empleados se sientan seguros y respetados en el lugar de trabajo?\na. Crear una cultura de respeto\nb. Implementar políticas de igualdad de género\nc. Crear una cultura de tolerancia cero hacia la violencia laboral\nd. Todas las anteriores\n\nRespuesta correcta: d. Todas las anteriores\n\n4. ¿Qué medidas deben tomar los empleadores para prevenir la violencia laboral?\na. Crear un ambiente de trabajo seguro y respetuoso\nb. Implementar políticas y procedimientos para abordar la violencia laboral\nc. Capacitar a los empleados sobre la violencia laboral\nd. Todas las anteriores\n\nRespuesta correcta: d. Todas las anteriores\n\n5. ¿Qué medidas deben tomar los empleadores para garantizar que los empleados se sientan seguros y respetados en el lugar de trabajo?\na. Crear una cultura de respeto\nb. Implementar políticas de igualdad de género\nc. Crear una cultura de tolerancia cero hacia la violencia laboral\nd. Todas las anteriores\n\nRespuesta correcta: d. Todas las anteriores\n\nReflexión:\n\nLa violencia laboral es una forma de abuso que puede tener un impacto negativo en la salud mental y física de los trabajadores, así como en la productividad y el rendimiento de la empresa. Es importante que los empleadores tomen medidas para prevenir y abordar la violencia laboral, como la creación de un ambiente de trabajo seguro y respetuoso, la implementación de políticas y procedimientos para abordar la violencia laboral, la capacitación de los empleados sobre la violencia laboral y la creación de un sistema de denuncias para los empleados. Además, los empleadores deben tomar medidas para garantizar que los empleados se sientan seguros y respetados en el lugar de trabajo, como la creación de una cultura de respeto, la implementación de políticas de igualdad de género, la creación de una cultura de tolerancia cero hacia la violencia laboral y la creación de un sistema de apoyo para los empleados que han sido víctimas de violencia laboral. Es importante que los empleadores tomen medidas para abordar la violencia laboral para garantizar un ambiente de trabajo seguro y respetuoso para todos.' )
    
    setIsLoading( false )
  }

  useEffect( () => {
    processTheme()
  }, [] )

  return {
    apiOpenAIResponse,
    numberTokens,
    isLoading
  }
}