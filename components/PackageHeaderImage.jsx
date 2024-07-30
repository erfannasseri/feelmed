import React from 'react'
import Image from 'next/image'
//import headerImage from './header.jpg'
import headerImage from '../assets/images/1719896523114 copys.png'


const PackageHeaderImage = ({image}) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
            <div className='relative'>
            <Image
            src={headerImage}
            alt=""
            className="  object-cover h-full "
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