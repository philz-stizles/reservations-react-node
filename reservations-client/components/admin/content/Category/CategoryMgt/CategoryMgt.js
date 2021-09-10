import React, { Fragment, useContext, useEffect, useState } from 'react'
import NotificationContext from '../../../../../store/context/notification-context'
import IconButton from '../../../../ui/buttons/IconButton'
import Loader from '../../../../ui/loaders/Loader'
import Modal from '../../../../ui/modals/Modal/Modal'
import Table from '../../../../ui/Table/Table'
import ContentHeader from '../../../ui/ContentHeader'
import CategoryForm from '../CategoryForm/CategoryForm'
import classes from './CategoryMgt.module.css'

const CategoryMgt = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const notificationCtx = useContext(NotificationContext)
  let categoriesOrLoader = <Loader />

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setIsLoading(true)
    fetch('/api/categories', {
      method: 'GET'
      // headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCategories(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const handleEdit = () => {}

  const handleDelete = (id) => {
    fetch(`/api/categories/${id}`, {
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
        loadCategories()
      })
      .catch((error) => console.log(error))
  }

  if (!isLoading) {
    categoriesOrLoader = (
      <Table rows={categories} onDeleteRow={handleDelete} onEditRow={handleEdit} />
    )
  }

  return (
    <Fragment>
      <ContentHeader title="Manage Categories" subTitle="Create and edit blog categories">
        <IconButton
          label="Create new"
          icon="las la-plus-square"
          onClick={() => setIsModalOpen(true)}
        />
      </ContentHeader>
      <div className={classes.CategoryGrid}>{categoriesOrLoader}</div>
      {isModalOpen && (
        <Modal
          title="Create a new category"
          isShowing={isModalOpen}
          onCloseModal={() => {
            setIsModalOpen(false)
          }}>
          <CategoryForm
            onCloseModal={() => {
              setIsModalOpen(false)
              loadCategories()
            }}
          />
        </Modal>
      )}
    </Fragment>
  )
}

export default CategoryMgt
