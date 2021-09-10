import React, { Fragment } from 'react'
import IconButton from '../../../ui/buttons/IconButton'
import CustomInput from '../../../ui/form/CustomInput/CustomInput'
import ContentHeader from '../../ui/ContentHeader'
import ReactQuillWidget from '../../../ui/form/ReactQuillWidget'

import classes from './BlogMgt.module.css'

const BlogMgt = () => {
  return (
    <Fragment>
      <ContentHeader title="Manage Blogs" subTitle="Create and edit tech blogs">
        <IconButton label="Create new" icon="las la-plus-square" />
      </ContentHeader>
      <div className={classes.formArea}>
        <div className={classes.formArea__title}>
          <CustomInput type="text" label="Title" />
        </div>

        <div className={classes.formArea__content}>
          <ReactQuillWidget label="Content" />
        </div>

        <div className={classes.formArea__right}></div>
      </div>
    </Fragment>
  )
}

export default BlogMgt
