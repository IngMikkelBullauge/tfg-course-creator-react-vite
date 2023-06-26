import { useState } from 'react'
import { PropTypes } from 'prop-types'


import { ThemeCard } from './ThemeCard'

export const ListCardThemes = ( { themesToProcess } ) => {
  

  const [ themes ] = useState( themesToProcess.split( /[0-9][.][ ]/ ) )
  
  
  return (
    <div className="list-group list-group-horizontal text-nowrap overflow-auto">
      {
        themes
          .filter( theme => theme !== '\n\n')
          .map( ( theme, index ) => (
            <ThemeCard
              key={ index }
              themeToProcess={ theme }
              numberTokensProp={0}
            />
        ))
      }
    </div>
  )
}

ListCardThemes.propTypes = {
  themesToProcess: PropTypes.string.isRequired,
}
