import React from 'react'
import InfoBox from './InfoBox'
const PackagesInfoBoxes = () => {
  return (
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox 
              heading="Treatment package"
              backgroundColor=''
              backgroundImage='https://umanitoba.ca/explore/sites/explore/files/styles/21x9_1100w/public/2021-06/international-medical-graduate-hero.png?itok=qBSKnNpO'
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
              backgroundColor=''
              backgroundImage='https://ruhee.ae/uploads/cachewebp/news/2807Facial%20banner-1600x700.webp'
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

export default PackagesInfoBoxes