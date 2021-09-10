import React, { useContext, useRef, useState } from 'react'
import Resizer from 'react-image-file-resizer'
import PropTypes from 'prop-types'
import NotificationContext from '../../../../../store/context/notification-context'
import IconButton from '../../../../ui/buttons/IconButton'
import CustomInput from '../../../../ui/form/CustomInput/CustomInput'
import classes from './CategoryForm.module.css'
import FileUploadInput from '../../../../ui/form/FileUploadInput/FileUploadInput'

const CategoryForm = ({ onCloseModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const notificationCtx = useContext(NotificationContext)

  const nameInputRef = useRef('')
  const descriptionInputRef = useRef('')
  const [imageRelatedData, setImageRelatedData] = useState({
    imageUploadOrButtonText: 'Upload image',
    imagePreview: '',
    image: ''
  })

  const { imageUploadOrButtonText, imagePreview, image } = imageRelatedData

  const handleFileInputChange = (e) => {
    const { files } = e.target
    const fileInput = files[0]

    if (fileInput) {
      // console.log(fileInput.name)
      Resizer.imageFileResizer(
        fileInput,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          console.log(uri)
          setImageRelatedData({
            ...imageRelatedData,
            image: uri,
            imageUploadOrButtonText: fileInput.name
          })
          console.log(imageRelatedData)
        },
        'file' // Option: [ file | base64 | blob ]
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    const name = nameInputRef.current.value
    const description = descriptionInputRef.current.value

    console.log(name, description)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)

    fetch('/api/categories', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false)
        console.log(data)
        if (!data.status) {
          notificationCtx.showNotification({
            title: 'Create Tag',
            message: data.message,
            status: 'error'
          })
        } else {
          notificationCtx.showNotification({
            title: 'Create Tag',
            message: data.message,
            status: 'success'
          })
          onCloseModal()
        }
      })
      .catch((error) => {
        console.log(error)
        setIsSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        type="text"
        label="Category"
        ref={nameInputRef}
        placeholder="Whats the name of the category?"
      />

      <CustomInput
        type="text"
        label="Description"
        ref={descriptionInputRef}
        placeholder="Whats it about?"
      />

      <FileUploadInput
        imageUploadOrButtonText={imageUploadOrButtonText}
        imagePreview={imagePreview}
        onFileInputChange={handleFileInputChange}
      />
      <div className={classes['action-buttons']}>
        <IconButton label="Submit" loading={isSubmitting} />
      </div>
    </form>
  )
}

CategoryForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired
}

export default CategoryForm
