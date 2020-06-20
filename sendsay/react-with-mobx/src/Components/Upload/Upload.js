import React from 'react'
import Dropzone from 'react-dropzone'
import classes from './Upload.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'


export default observer(() => {

  return (
    <>
    <div
      className={classes.span}
      onClick={Store.closeLoadPage}
      >
      X
    </div>

<Dropzone
    onDrop={(acceptedFiles, rejectFiles) => Store.handleDrop(acceptedFiles, rejectFiles)}
    maxSize = {Store.state.detailsFiles.maxSizeFile}
    accept= {Store.state.detailsFiles.acceptFiles}
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
)
