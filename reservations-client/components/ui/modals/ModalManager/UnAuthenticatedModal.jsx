/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Modal } from 'semantic-ui-react'
import { openModal } from '../../redux/actions/modalActions'

const UnAuthenticatedModal = ({ history, setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { previousLocation } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const handleCloseModal = () => {
    if (!history) {
      setIsOpen(false)
      setIsModalOpen(false)
      return
    }

    if (history && previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push('/events')
    }

    setIsOpen(false)
  }

  const handleOpenLoginModal = (modalType) => {
    dispatch(openModal({ modalType }))
    setIsOpen(false)
    setIsModalOpen(false)
  }

  return (
    <Modal open={isOpen} size="mini" onClose={handleCloseModal}>
      <Modal.Header content="You need to be signed in to do that" />
      <Modal.Content>
        <p>Hi there, Kindly login or register to continue</p>

        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="Login"
            onClick={() => handleOpenLoginModal('LoginForm')}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => handleOpenLoginModal('RegisterForm')}
          />
        </Button.Group>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleCloseModal} content="Cancel" />
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default UnAuthenticatedModal
