import React from 'react'
import Image from 'next/image'
import headerImage from './header.jpg'


const PackageHeaderImage = ({image}) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
            <div className='relative'>
            <Image
            src={image[0]}
            alt=""
            className="  object-cover h-[400px] w-full opacity-50"
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
            </div>
        </div>
      </div>
    </section>
  )
}

export default PackageHeaderImage