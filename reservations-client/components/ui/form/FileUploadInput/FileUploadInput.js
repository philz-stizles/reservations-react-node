import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

const FileUploadInput = ({ imagePreview, imageUploadOrButtonText, onFileInputChange }) => {
  return (
    <div data-test="file-upload-input" className="FileUploadInput">
      <label htmlFor="file-upload" className="">
        <i className="las la-file-upload" />
        {imageUploadOrButtonText}{' '}
        <input accept="image/*" onChange={onFileInputChange} hidden type="file" id="file-upload" />
      </label>
      {imagePreview.trim() !== '' && (
        <span>
          <Image src={imagePreview} alt="image" width={20} height={20} />
        </span>
      )}
      <style jsx>{`
        .FileUploadInput {
          width: 100%;
          margin-bottom: 1rem;
        }

        .FileUploadInput label {
          display: inline-flex;
          outline: none;
          border: 1px solid #5850ec;
          color: #5850ec;
          border-radius: 5px;
          padding: 0.6rem 1rem;
          // margin-left: 1rem;
          font-weight: 500;
          align-items: center;
          cursor: pointer;
        }

        .FileUploadInput i {
          font-size: 2.4rem;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  )
}

FileUploadInput.propTypes = {
  imagePreview: PropTypes.string,
  imageUploadOrButtonText: PropTypes.string.isRequired,
  onFileInputChange: PropTypes.func.isRequired
}

export default FileUploadInput
