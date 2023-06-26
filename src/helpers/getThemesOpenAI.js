import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

// Evitar error de CORS
delete configuration.baseOptions.headers[ 'User-Agent' ]

const openai = new OpenAIApi( configuration );
// const [ prompt, setPrompt ] = useState( '' );
const [ apiOpenAIResponse, setApiOpenAIResponse ] = useState( '' );
const promptStart = 'Tu tarea es darme 10 temas para un micro curso de '
const promptEnd = ' . en forma de lista separados por saltos de linea, ¿entendiste esto?'



export const getThemesOpenAI = async( event ) => {
  setLoading( true )
  try {
    const result = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Hola como estas?',
      temperature: 0.5,
      max_tokens: 4000, // Límite de tokens de ChatGPT 3.5
    })
    // console.log( 'response', result.data.id ); 
    // console.log('ABC', result.data.choices[0] )
    setApiOpenAIResponse( result.data.choices[0].text )
    // console.log(  apiOpenAIResponse.replace( /\r?\n/, '||' ) )
    // setListThemes( apiOpenAIResponse.split( /\r?\n/ ) )
    // console.log( listThemes )

  } catch ( event ) {
    console.error( event );
    setApiOpenAIResponse( 'Algo salió mal, por favor intente de nuevo' );
  }
  setLoading( false )

  return apiOpenAIResponse
}