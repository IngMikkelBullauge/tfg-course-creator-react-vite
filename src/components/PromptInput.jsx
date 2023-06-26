// React
import { useState, useContext } from 'react'

// PropTypes
import { PropTypes } from 'prop-types'

// OpenAI
import { Configuration, OpenAIApi } from 'openai'

// Providers
import { MicroCoursePDFContext } from '../providers/MicroCoursePDFProvider'
import { TokenCountContext } from '../providers/TokenCountProvider'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faRobot } from '@fortawesome/free-solid-svg-icons'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

// Material UI
import TextField from '@mui/material/TextField'

// Componentes
import { ToastInfo } from './ToastInfo'
import { ThemesPreview } from './ThemesPreview'
import { ListCardThemes } from './ListCardThemes'
import { MicroCoursePDF } from './MicroCoursePDF'

export const PromptInput = ( { onNewPrompt } ) => {
  const { globalMicroCoursePDF, addMicroCoursePDF } = useContext( MicroCoursePDFContext )
  const { incrementTokenCount } = useContext( TokenCountContext )

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })
  // Evitar error de CORS
  delete configuration.baseOptions.headers[ 'User-Agent' ]

  const openai = new OpenAIApi( configuration );
  const [ apiOpenAIResponse, setApiOpenAIResponse ] = useState( '' )
  const [ loading, setLoading ] = useState( false );
  const [ promptUserValue, setUserPromptValue ] = useState( '' )
  
  const [ disablePrompt, setDisablePrompt ] = useState( false )
  const [ showPriceInfo, setShowPriceInfo] = useState( false )
  const toggleShowPriceInfo = () => setShowPriceInfo( !showPriceInfo )

  const [ valueMC, setValueMC ] = useState()

  const onPromptChange = ( { target } ) => {
    setUserPromptValue( target.value )
  }

  const onSubmitPromt = async ( event ) => {
    event.preventDefault()
    
    if( promptUserValue.trim().length <= 5 ) return
    onNewPrompt( promptUserValue.trim() )
    setUserPromptValue( '' )
    setApiOpenAIResponse( '' )
    setDisablePrompt( true )
    setLoading( true )
    toggleShowPriceInfo()

    try {
      const result = await openai.createCompletion({
        model: import.meta.env.VITE_THEME_PROMPT_MODEL,
        prompt: import.meta.env.VITE_THEME_START_PROMPT + promptUserValue + import.meta.env.VITE_THEME_END_PROMPT,
        temperature: parseInt(import.meta.env.VITE_THEME_PROMPT_TEMPERATURE),
        max_tokens: parseInt(import.meta.env.VITE_THEME_PROMPT_MAX_TOKENS), // Límite de tokens de ChatGPT 3.5
        top_p: parseInt(import.meta.env.VITE_THEME_PROMPT_TOP),
        frequency_penalty: parseInt(import.meta.env.VITE_THEME_PROMPT_FRECUENCY_PENALITY),
        presence_penalty: parseInt(import.meta.env.VITE_THEME_PROMPT_PRESENCE_PENALITY),
        // diversity_penality: 1.5,
        stream: false,
      })
      setApiOpenAIResponse( result.data.choices[0].text )
      incrementTokenCount( result.data.usage.total_tokens )
    } catch ( event ) {
      console.error( event )
      setApiOpenAIResponse( 'Algo salió mal, por favor intente de nuevo' )
    }

    // TODO: Para pruebas de desarrollo
    // const result = '\n\n1. Definición de violencia laboral\n2. Tipos de violencia laboral\n3. Identificación de comportamientos violentos\n4. Efectos de la violencia laboral\n5. Cómo prevenir la violencia laboral\n6. Cómo responder a la violencia laboral\n7. Cómo informar la violencia laboral\n8. Cómo abordar la violencia laboral\n9. Cómo lidiar con el acoso laboral\n10. Cómo promover un ambiente laboral seguro'
    // setApiOpenAIResponse( result )
    // incrementTokenCount( 188 )

    // const listThemes = setApiOpenAIResponse.split( /[0-9]{1,2}[.][ ]/ )
    // addMicroCoursePDF( 'Temas del micro curso \n' )
    // listThemes
    //   .filter( theme => theme !== '\n\n')
    //   .map( ( theme, index ) => (
    //     // <div key={ index }>{ theme.replace(new RegExp('\r?\n','g'), '<br />') }</div>
    //     addMicroCoursePDF( theme + '\n' )
    //   ))
    
    setLoading( false )
  }

  return (
    <Container fluid="md" className="contact-content debug-border">
      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <ToastInfo showInfo={ showPriceInfo } />
        </Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row className="justify-content-md-center">
        <Col md={ 2 } className="text-center text-md-right">
            <FontAwesomeIcon icon={ faRobot } size='2x' className='text-primary-emphasis' />
        </Col>
        <Col md={ 5 }>
          <form onSubmit={ onSubmitPromt } aria-label="form">
            <TextField 
              name='prompt_user'
              id="filled-basic" 
              color='info'
              disabled={ disablePrompt }
              label="Tema del micro curso ..." 
              variant="filled" 
              fullWidth 
              value={ promptUserValue }
              onChange={ onPromptChange }
            />
          </form>
        </Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          { loading && <Spinner animation="border" variant="info" /> }        
        </Col>
        <Col md={ 5 } className='text-info'>
          { loading && 'Obteniendo temas del micro curso, espere ...' }
        </Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row className="justify-content-md-center">
        <Col md={12}>
          { apiOpenAIResponse && ( <ThemesPreview themes={ apiOpenAIResponse }/> ) }        
        </Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row className="justify-content-md-center">
        <Col md={12}>
          { apiOpenAIResponse && ( <ListCardThemes themesToProcess={ apiOpenAIResponse } /> ) }       
        </Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row className="justify-content-md-center">
        <Col md={12}>
          { apiOpenAIResponse && ( <MicroCoursePDF microCourseProcess={ globalMicroCoursePDF } /> ) }       
        </Col>
      </Row>
    </Container>

  )

}

PromptInput.propTypes = {
  onNewPrompt: PropTypes.func.isRequired
}
