import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic' // For dynamic importing e.g. with react-quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../../node_modules/react-quill/dist/quill.snow.css'

const QuillModules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
}

const QuillFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
]

const ReactQuillWidget = ({ onChange, value, label }) => {
  return (
    <div className="ReactQuillWidget">
      <label htmlFor={label}>{label}</label>
      <ReactQuill
        id={label}
        modules={QuillModules}
        formats={QuillFormats}
        value={value}
        placeholder="Write something amazing..."
        onChange={onChange}
      />
      <style jsx>{`
        .ReactQuillWidget label {
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  )
}

ReactQuillWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default ReactQuillWidget
