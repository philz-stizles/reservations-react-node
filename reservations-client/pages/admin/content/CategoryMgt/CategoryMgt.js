import React from 'react'
import useSWR from 'swr'

const fetcher = async (uri) => {
  const response = await fetch(uri)
  return response.json()
}

const CategoryMgmt = () => {
  const { data, error } = useSWR('/api/categories', fetcher)
  if (error) return <div>oops... {error.message}</div>
  if (data === undefined) return <div>Loading...</div>

  return <div>Category Mng</div>
}

export default CategoryMgmt
