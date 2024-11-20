import React from 'react'

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center py-20">
    <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-blue-600" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)
}

export default Loader