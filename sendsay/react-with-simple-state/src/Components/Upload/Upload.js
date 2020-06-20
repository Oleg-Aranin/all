import React from 'react'
import Dropzone from 'react-dropzone'
import classes from './Upload.module.css'

export default props => {

  return (
    <>
    <div
      className={classes.span}
      onClick={props.closeLoadPage}
      >
      X
    </div>

<Dropzone
    onDrop={(acceptedFiles, rejectFiles) => props.handleDrop(acceptedFiles, rejectFiles)}
    maxSize = {props.state.maxSizeFile}
    accept= {props.state.acceptFiles}
    >
  {
    ({getRootProps, getInputProps}) => (
    <section className={classes.Upload}>

      <div {...getRootProps()}>

        <input {...getInputProps()} />
        <h2>Бросайте файлы сюда, я ловлю</h2>
        <p>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. <br />Размеры файла до 5 МБ</p>
      </div>
    </section>
  )
}
</Dropzone>
</>
  )}
