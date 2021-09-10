import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import NotificationContext from '../../../../store/context/notification-context'
import IconButton from '../../../ui/buttons/IconButton'
import CardContainer from '../../../ui/cards/CardContainer/CardContainer'
import CustomInput from '../../../ui/form/CustomInput/CustomInput'
import Loader from '../../../ui/loaders/Loader'
import Modal from '../../../ui/modals/Modal/Modal'
import TagOutlined from '../../../ui/tags/TagOutlined/TagOutlined'
import ContentHeader from '../../ui/ContentHeader'
import classes from './TagMgt.module.css'

const TagMgt = () => {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const notificationCtx = useContext(NotificationContext)
  let tagsOrLoader = <Loader />

  const nameInputRef = useRef('')
  const descriptionInputRef = useRef('')

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    setIsLoading(true)
    fetch('/api/tags', {
      method: 'GET'
      // headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTags(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameInputRef.current.value
    const description = descriptionInputRef.current.value

    console.log(name, description)

    fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description
      })
    })
      .then((res) => res.json())
      .then((data) => {
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
          loadTags()
          setIsModalOpen(false)
        }
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = (id) => {
    fetch(`/api/tags/${id}`, {
      method: 'DELETE'
      // headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Delete Tag',
          message: data.message,
          status: 'success'
        })
        console.log(data)
        loadTags()
      })
      .catch((error) => console.log(error))
  }

  if (!isLoading) {
    tagsOrLoader = (
      <div className={classes.tagsContainer}>
        {tags.map(({ _id, name }) => (
          <TagOutlined
            key={_id}
            text={name}
            onCancel={() => handleDelete(_id)}
            onClick={() => {}}
          />
        ))}
      </div>
    )
  }

  return (
    <Fragment>
      <ContentHeader title="Manage Tags" subTitle="Create blog tags for SEO">
        <IconButton
          label="Create new"
          icon="las la-plus-square"
          onClick={() => setIsModalOpen(true)}
        />
      </ContentHeader>
      <CardContainer>{tagsOrLoader}</CardContainer>
      {isModalOpen && (
        <Modal
          title="CREATE A TAG"
          isShowing={isModalOpen}
          onCloseModal={() => {
            setIsModalOpen(false)
          }}>
          <form onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              label="Name"
              ref={nameInputRef}
              placeholder="Whats the name of the tag?"
            />

            <CustomInput
              type="text"
              label="Description"
              ref={descriptionInputRef}
              placeholder="Whats it about?"
            />

            <div className={classes['action-buttons']}>
              <IconButton label="Submit" />
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  )
}

export default TagMgt
