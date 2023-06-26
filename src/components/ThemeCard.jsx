import { useContext, useEffect } from 'react'
import { PropTypes } from 'prop-types'

import { useProcessTheme } from '../hooks/useProcessTheme'
import { MicroCoursePDFContext } from '../providers/MicroCoursePDFProvider'
import { TokenCountContext } from '../providers/TokenCountProvider'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';

// Bootstrap
import { Card, Spinner } from 'react-bootstrap'
// import Spinner from 'react-bootstrap/Spinner'

export const ThemeCard = ( { themeToProcess } ) => {
  const { globalMicroCoursePDF, addMicroCoursePDF } = useContext( MicroCoursePDFContext )
  const { incrementTokenCount } = useContext( TokenCountContext )
  
  const { apiOpenAIResponse, numberTokens, isLoading } = useProcessTheme( themeToProcess )

  const topicResume = () => {
    return apiOpenAIResponse.split( '\n' ).map( ( line, index ) => (
      <p key={ index }>{ line }</p>
    ))
  }

  useEffect(() => {
    incrementTokenCount( numberTokens )
    addMicroCoursePDF( apiOpenAIResponse )
  }, [numberTokens])
  
  return (
    // <>
    //   <div name="card_theme_1" className="col" style={{ paddingRight: '1rem' }}>
    //     <div className="card border-info mb-3" style={{ width: '40rem' }}>
    //       <div name="ia_response_theme" className="card-header bg-transparent border-info text-wrap">
    //         {/* <strong><FontAwesomeIcon icon={faFileContract} /> { themeToProcess } ( $ { numberTokens } )</strong> */}
    //         <strong><FontAwesomeIcon icon={faFileContract} /> { themeToProcess }</strong>
    //       </div>
    //       <div name="ia_response_body" className="card-body text-dark text-wrap overflow-auto" style={{ height: '400px', maxHeight: '400px' }}>
    //         { isLoading && <Spinner animation="border" variant="info" /> } { isLoading && 'Generando contenido del tema '+themeToProcess+', espere un momento ...' }
    //         {/* <textarea  value={apiOpenAIResponse} name="" id="" cols="30" rows="10"></textarea> */}
    //         { topicResume() }
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div style={{paddingRight: '1rem', width: '100rem' }}>
      <Card
        border="info"
      >
        <Card.Header>
          <strong className="text-info"><FontAwesomeIcon icon={faFileContract} /> { themeToProcess }</strong>
        </Card.Header>
        <Card.Body style={{ width: '48rem' }}>
          <Card.Title>
            { isLoading && <Spinner animation="border" variant="info" /> } { isLoading && 'Generando contenido del tema, espere un momento ...' }
          </Card.Title>
          <Card.Text as='div' className="text-wrap overflow-auto text-body-tertiary" style={{ height: '400px', maxHeight: '400px' }}>
            { topicResume() }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

ThemeCard.propTypes = {
  themeToProcess: PropTypes.string.isRequired,
}