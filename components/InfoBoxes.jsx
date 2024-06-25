import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
  return (
    /* <!-- Renters and Owners --> */
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox 
                heading="Treatment package"
                backgroundColor='bg-gray-100'
                buttonInfo={{
                    text: 'Browse Packages',
                    link: '/packages/medical',
                    backgroundColor: 'bg-black',
                }}
            >
                Find the treatment package you want easily 
            </InfoBox>
            <InfoBox 
                heading="Beauty treatment package"
                backgroundColor='bg-blue-100'
                buttonInfo={{
                    text: 'Browse Packages',
                    link: '/packages/cosmetic',
                    backgroundColor: 'bg-blue-500',
                }}
            >
                Experience the best beauty procedures with the best and most experienced doctors with our packages 
            </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes