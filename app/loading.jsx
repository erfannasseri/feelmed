"use client";

import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingPage = ({loading}) => {
    
    const override = {
        display:'block',
        margin:'100px auto'
    }

  return (
    <div className='min-h-[100%]'>
    <ClipLoader
      color='#3b82f6'
      loading={loading}
      cssOverride={override}
      size={350}
      aria-label="Loading Spinner"
    />
    </div>
  )
}

export default LoadingPage