import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = "NotFound - 404"
  }, [])
  return (
    <div>NotFound - 404</div>
  )
}

export default NotFound