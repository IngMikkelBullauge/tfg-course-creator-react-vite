export const MicroCoursePDF = ({ microCourseProcess }) => {
  return (
    <>
      <div className='d-none'>
        <div id="div-a-exportar">{
          microCourseProcess.split( '\n' ).map( ( line, index ) => (
            <p key={ index }>{ line }</p>
          ))
        }</div>

      </div>
    </>
  )
}
