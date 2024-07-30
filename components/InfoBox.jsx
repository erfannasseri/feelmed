import Link from 'next/link'
import React from 'react'

function InfoBox({
    heading,
    backgroundColor="bg-gray-100",
    textColor = 'text-gray-800',
    buttonInfo,
    children,
    backgroundImage
}) {

  console.log(backgroundColor);
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow:'hidden'
          }}
          >
        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
        <p className={`${textColor} mt-2 mb-4`}>
            {children}
        </p>
        <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
        >
        {buttonInfo.text}
        </Link>
        <img
        src={backgroundImage}
        alt="Background Image"
        style={{
          opacity: 0.3, // adjust opacity here
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex:-1
        }}
      />
    </div>
  )
}

export default InfoBox