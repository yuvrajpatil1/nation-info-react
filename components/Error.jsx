import React from 'react'
import { useAsyncError } from 'react-router'

function Error() {
    const error = useAsyncError()
    console.log(error);
  return (
    <div>Oops! Something Went Wrong</div>
  )
}

export default Error