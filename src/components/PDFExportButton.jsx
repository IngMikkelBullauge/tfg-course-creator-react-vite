import html2pdf from 'html2pdf.js'

export const PDFExportButton = () => {
  const exportToPDF = () => {
    const element = document.getElementById('div-a-exportar');
    const opt = {
      margin: 1,
      filename: 'contenido_exportado.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button onClick={exportToPDF}>Exportar a PDF</button>
  )
}
