'use client'
import React, { useEffect,useState } from 'react'
import { FaCheck,FaCheckSquare,FaQuestionCircle , FaMedal , FaMapMarker ,FaStar ,FaHandHoldingMedical,FaUserMd } from 'react-icons/fa'


const PackageDetails = ({Package}) => {

    const star = (<FaStar className='inline mb-2'/>)
    const [Stars, setStars] = useState([]);

    useEffect(() => {   
      const renderedStars = [];
      for (let i = 0; i < parseInt(Package.accommodation.stars); i++) {
        renderedStars.push(star);
       
      }
      setStars(renderedStars)
    }, []);

  return (
    <main>
    <div
      className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
    >
      <div className="text-gray-500 mb-4">{Package.category}</div>
      <h1 className="text-3xl font-bold mb-4">{Package.title}</h1>
      <div
        className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
      >
        <FaMapMarker
          className="text-lg text-orange-700 mr-2"
        ></FaMapMarker>
        <p className="text-orange-700">
          {Package.accommodation.location}
        </p>
      </div>
        <p className="">
          {Package.description}
        </p>

      <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Rates & Options
      </h3>
      <div className="flex flex-col md:flex-row justify-around">
        <div
          className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
        >
          <div className="text-gray-500 mr-2 font-bold">Package</div>
          <div className="text-2xl font-bold">
            <FaMedal 
            className={`
            inline mr-3 ' ${Package.packageType === 'Gold' && 'text-yellow-500'}
            ${Package.packageType === 'Silver' && 'text-gray-400'}
            ${Package.packageType === 'Bronze' && 'text-brown-700'}
             `}/>{Package.packageType}
            <i className="fa fa-xmark text-red-700"></i>
          </div>
        </div>
        <div
          className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
        >
          <div className="text-gray-500 mr-2 font-bold">Price</div>
          <div className="text-2xl font-bold text-blue-500">${Package.totalPrice}</div>
        </div>
        <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
          <div className="text-gray-500 mr-2 font-bold">Transportation</div>
          <div className="text-2xl font-bold text-blue-500">{Package.transportation.type}</div>
        </div>
      </div>
    </div>


{/* Service */}

    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Services
      </h3>

    <div className='ml-8' >
          {Package.services.map((service,key) => (
          (
            <div key={key}>          
            <p className="text-xl font-bold text-blue-500 mb-4 ">
            <FaHandHoldingMedical className='inline mb-2 '/>  {service.name}
            </p>
            <p className="text-gray-500 mb-4">
            {service.description}
            </p>
            </div>

          )
          ))
          }
          </div>
  


    </div>

    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Doctor
      </h3>

      <div className='ml-8' >

        
        <p className="text-xl font-bold text-blue-500 mb-4 ">
        <FaUserMd className='inline mb-2 '/>  {   Package.doctor.name   }
        </p>
        <p className="text-gray-500 mb-4">
        {   Package.doctor.description   }
        </p>


      </div>


    </div>


    <div
      className="bg-white p-6 rounded-lg shadow-md text-center md:text-left mt-6"
    >

      <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
      Accommodation
      </h3>
      <div className="flex flex-col md:flex-row justify-around">
        <div
          className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
        >
          <div className="text-gray-500 mr-2 font-bold">{Package.accommodation.type}: </div>
          <div className="text-2xl font-bold">
            {Package.accommodation.name}
            <i className="fa fa-xmark text-red-700"></i>
          </div>
        </div>
        <div
          className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
        >
          <div className="text-gray-500 mr-2 font-bold">Stars: </div>
          
          <div className="text-2xl font-bold text-yellow-500">{Stars}</div>
        </div>
      </div>
        <p className="text-gray-500 mb-4 ml-8 mr-8">
        {   Package.accommodation.description   }
        </p>
      <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">Amenities</h3>

      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 list-none  "
      >
        {Package.accommodation.amenities.map((amenities,index)=>(
                  <li key={index}>
                  <FaCheck className='text-green-600 inline mr-2' /> 
                   {amenities}
                 </li>
        ))}

      </ul>
    </div>
      
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Benefits
      </h3>

      {
        Package.benefits.map((Package,index)=> (
          <div className='ml-8' key={index}>
            <p className="text-xl font-semibold mb-4 ">
            <FaCheckSquare className='text-green-600 inline mr-2 mb-1' />{Package}
            </p>
          </div>
      ))                
      }

    </div>

    

    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        FAQs
      </h3>

          <div className='ml-8' >
      {
        Package.faq.map((faq,key)=>(
          (
            <div key={key}>
              <p className="text-xl mb-1 text-blue-500 font-bold">
              <FaQuestionCircle className='text-green-600 inline mr-2 mb-2' />{faq.question}
              </p>
              <p className='mb-4 font-semibold'>{faq.answer}</p>
            </div>
          )
        ))
      }
          </div>

    </div>
{/*     <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div id="map"></div>
    </div> */}
  </main>
  )
}



export default PackageDetails 