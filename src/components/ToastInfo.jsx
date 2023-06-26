import { useContext } from 'react'
import html2pdf from 'html2pdf.js'

import { TokenCountContext } from '../providers/TokenCountProvider'
import Button from 'react-bootstrap/Button'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faInfoCircle, faMoneyBill, faFilePdf, faCopy } from '@fortawesome/free-solid-svg-icons'

import Toast from 'react-bootstrap/Toast'

export const ToastInfo = ( { showInfo } ) => {
  const exportToPDF = () => {
    const element = document.getElementById('div-a-exportar')
    const opt = {
      margin: 1,
      filename: 'contenido_exportado.pdf',
      // image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { letterRendering: true, useCORS: true,     logging: true },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' }
    }

    html2pdf().set(opt).from(element).save();
  }

  const copyMicroCourse = () => {
    // const divContent = document.getElementById('div-a-exportar').textContent;
    // navigator.clipboard.writeText(divContent)
    //   .then(() => {
    //     console.log('Contenido copiado al portapapeles');
    //   })
    //   .catch((error) => {
    //     console.error('Error al copiar el contenido:', error);
    //   })
    //console.log(123)
    const element = document.getElementById( 'div-a-exportar' )
    const range = document.createRange()
    range.selectNodeContents( element )
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange( range )
    document.execCommand( 'copy' )
    selection.removeAllRanges()
  }

  const { globalTokenCount } = useContext( TokenCountContext )
  
  return (
    <Toast show={ showInfo }>
      <Toast.Header className='text-info'>
        <strong className="me-auto"><FontAwesomeIcon icon={faInfoCircle} /> Información del micro curso generado</strong>
      </Toast.Header>
      <Toast.Body>
        <p><FontAwesomeIcon icon={faCoins} /> Total de tokens usados: <strong className="text-danger">{ parseInt(globalTokenCount) } tokens</strong></p>
        <p><FontAwesomeIcon icon={faMoneyBill} /> Precio del micro curso: <strong className="text-danger">$ { ( ( parseInt(globalTokenCount) * parseFloat(import.meta.env.VITE_PRICE_BY_1K) ) / 1000 ).toFixed( 3 ) } dólares</strong></p>
        <Button variant="success" onClick={ exportToPDF }><FontAwesomeIcon icon={ faFilePdf } /></Button>&nbsp;&nbsp;&nbsp;
        <Button variant="success" onClick={ copyMicroCourse }><FontAwesomeIcon icon={ faCopy } /></Button>
      </Toast.Body>
    </Toast>
  )
}
