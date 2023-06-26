import { useState } from 'react'
import { PropTypes } from 'prop-types'

// Bootstrap
import Card from 'react-bootstrap/Card'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';


export const ThemesPreview = ( { themes } ) => {
  // const [ listThemes ] = useState( themes.split( /[0-9][.][ ]/ ) )
  const [ listThemes ] = useState( themes.split( /[0-9]{1,2}[.][ ]/ ) )

  return (

    <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
    >
      <Card
        bg='info'
        key='primary'
        text={'primary' === 'light' ? 'dark' : 'white'}
        style={{ width: '48rem' }}
        className="mb-2"
      >
        <Card.Header><FontAwesomeIcon icon={faClipboardList} /> Temas del microcurso</Card.Header>
        <Card.Body>
          <Card.Title> Estos serían los temas para el micro curso </Card.Title>
          <Card.Text as='div'>
            <ul>
              {
                listThemes
                .filter( theme => theme !== '\n\n')
                .map( ( theme, index ) => (
                  // <div key={ index }>{ theme.replace(new RegExp('\r?\n','g'), '<br />') }</div>
                  <li key={ index }>{ theme }</li>
                  ))
                }
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

  )
}

// PropTypes
ThemesPreview.protoTypes = {
  themes: PropTypes.array.isRequired,
}