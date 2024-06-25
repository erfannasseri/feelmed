import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'


const AddPackageForm = () => {


    const[Fields,SetFields]=useState({
        title: "",
        description: "",
        category: "Medical",
        packageType: "Gold",
        totalPrice: '',
        images: [],
        services:[
          {
            name: "",
            description: "",
        }
        ] 
        ,
        doctor:
        {
            name: "",
            description: "",
        }
        ,
        accommodation: {
            type: "Hotel",
            name:"",
            stars: '',
            location: "",
        },
        amenities: [],
        transportation: {
            type: "",
        },
        duration: '',
        description: '',
        benefits: [""],
        faq:[
          {
            question: "",
            answer: ""
        },
        ]
        
    })
    
    

    const handleAddService = (e) => {
      e.preventDefault();
      SetFields({
        ...Fields,
        services: [...Fields.services, { name: "", description: "" }],
      });
    };
    const handleAddFAQ = (e) => {
      e.preventDefault();
      SetFields({
        ...Fields,
        faq: [...Fields.faq, { question: "", answer: "" }],
      });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check if nested property
        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');
            
            SetFields((prevFields) => ({
                ...prevFields,
                [outerKey]: {
                    ...prevFields[outerKey],
                    [innerKey]: value,
                },
            }));
        } else {
            // Not nested
            SetFields((prevFields) => ({
                ...prevFields,
                [name]: value,
            }));
        }
    };
    const handelAmenitisChange=(e)=>{
        const { value, checked } = e.target;
        
        // Clone the current array
        const updatedAmenites = [...Fields.amenities];
        
        if (checked) {
            // Add value to array
            updatedAmenites.push(value);
        } else {
            // Remove value from array
      const index = updatedAmenites.indexOf(value);
      
      if (index !== -1) {
          updatedAmenites.splice(index, 1);
        }
    }
    
    // Update state with updated array
    SetFields((prevFields) => ({
        ...prevFields,
        amenities: updatedAmenites,
    }));
}
const handleImageChange = (e) => {
  const { files } = e.target;

  // Clone images array
  const updatedImages = [...Fields.images];

  // Add new files to the array
  for (const file of files) {
    updatedImages.push(file);
  }

  // Update state with array of images
  SetFields((prevFields) => ({
    ...prevFields,
    images: updatedImages,
  }));
};

    const handleAddBenefit = (e) => {
      e.preventDefault();
      SetFields({
       ...Fields,
        benefits: [...Fields.benefits, ""]
      });
    };
  
  return (
    <form action="/api/packages" method='POST' encType='multipart/form-data'>
    <h2 className="text-3xl text-center font-semibold mb-6">
      Add Package
    </h2>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" >Package title</label>
      <input
        type="text"
        id="title"
        name="title"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="eg. Dental Implant Package in Isfahan"
        required
        value={Fields.title}
        onChange={handleChange}
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-gray-700 font-bold mb-2"
        >Package Type</label>
      <select
        id="category"
        name="category"
        className="border rounded w-full py-2 px-3"
        required
        value={Fields.category}
        onChange={handleChange}
      >
        <option value="Medical">Medical</option>
        <option value="Cosmetic">Cosmetic</option>

      </select>
    </div>
    <div className="mb-4">
      <label
        htmlFor="packageType"
        className="block text-gray-700 font-bold mb-2">Package Type</label>
      <select
        id="packageType"
        name="packageType"
        className="border rounded w-full py-2 px-3 mb-2"
        required
        value={Fields.packageType}
        onChange={handleChange}
      >
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Bronze">Bronze</option>

      </select>
      <label
        htmlFor="totalPrice"
        className="block text-gray-700 font-bold mb-2"
        >Package Price</label>
      <input
        
        type="number"
        min={1}
        id="totalPrice"
        name="totalPrice"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="eg. ($) 3500 "
        required
        value={Fields.totalPrice}
        onChange={handleChange}
      />

    </div>
    <div className="mb-4">
      <label
        htmlFor="description"
        className="block text-gray-700 font-bold mb-2">
            Package Description
            </label>
      <textarea
        id="description"
        name="description"
        className="border rounded w-full py-2 px-3"
        rows="4"
        placeholder="Add an optional description of your Package"
        value={Fields.description}
        onChange={handleChange}
      ></textarea>
    </div>
    <div className="mb-4">

      <label className="block text-gray-700 font-bold mb-2">Doctor Name</label>
      <input
        type="text"
        id="doctor.name"
        name="doctor.name"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="eg. Dr. Ali Nasseri"
        required
        value={Fields.doctor.name}
        onChange={handleChange}
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="doctor.description"
        className="block text-gray-700 font-bold mb-2">Doctor biography</label>
      <textarea
        id="doctor.description"
        name="doctor.description"
        className="border rounded w-full py-2 px-3"
        rows="4"
        placeholder="Add description and biography of doctor"
        value={Fields.doctor.description}
        onChange={handleChange}
      ></textarea>
    </div>
    
    {/* Services */}

    {Fields.services.map((service, index) => (
  <div key={index}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Service Title</label>
      <input
        type="text"
        id={`services.${index}.name`}
        name={`services.${index}.name`}
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="eg. Dental Implant Package in Isfahan"
        required
        value={service.name}
        onChange={(e) => {
          const newServices = [...Fields.services];
          newServices[index].name = e.target.value;
          SetFields({ ...Fields, services: newServices });
        }}
      />
    </div>
    <div className="">
      <label
        htmlFor={`services.${index}.description`}
        className="block text-gray-700 font-bold mb-2">Service Description</label>
      <textarea
        id={`services.${index}.description`}
        name={`services.${index}.description`}
        className="border rounded w-full py-2 px-3"
        rows="4"
        placeholder="Add an optional description of your Package"
        value={service.description}
        onChange={(e) => {
          const newServices = [...Fields.services];
          newServices[index].description = e.target.value;
          SetFields({ ...Fields, services: newServices });
        }}
      ></textarea>
    </div>
  </div>
))}
      <div onClick={handleAddService} className='cursor-pointer mb-4 text-sm'>
      <FaPlusCircle className='mb-1 mr-1 inline'/> <button className='font-bold'>Add Service</button>
      </div>




    <div className="mb-4 bg-blue-50 p-4">
      <label className="block text-gray-700 font-bold mb-2">Accommodation</label>
      <select
        id="accommodation.type"
        name="accommodation.type"
        className="border rounded w-full py-2 px-3 mb-2"
        required
        value={Fields.accommodation.type}
        onChange={handleChange}
      >
        <option value="Hotel">Hotel</option>
        <option value="Hotel-Apartment">Hotel Apartment</option>

      </select>
      <input
        type="text"
        id="accommodation.location"
        name="accommodation.location"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="Location"
        value={Fields.accommodation.location}
        onChange={handleChange}
      />
      <input
        type="text"
        id="accommodation.name"
        name="accommodation.name"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="Accommodation Name"
        required
        value={Fields.accommodation.name}
        onChange={handleChange}
      />
      <input
        type="number"
        max={5}
        min={1}
        id="accommodation.stars"
        name="accommodation.stars"
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="Stars"
        required
        value={Fields.accommodation.stars}
        onChange={handleChange}
      />
    
    <label
        htmlFor="accommodation.description"
        className="block text-gray-700 font-bold mb-2">Accommodation Description</label>
      <textarea
        id="accommodation.description"
        name="accommodation.description"
        className="border rounded w-full py-2 px-3"
        rows="4"
        placeholder="Add an optional description of accommodation"
        value={Fields.accommodation.description}
        onChange={handleChange}
      ></textarea>
    </div>

    <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Amenities
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            <div>
              <input
                type='checkbox'
                id='amenity_wifi'
                name='amenities'
                value='Wifi'
                className='mr-2'
                checked={Fields.amenities.includes('Wifi')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_wifi'>Wifi</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_kitchen'
                name='amenities'
                value='Full Kitchen'
                className='mr-2'
                checked={Fields.amenities.includes('Full Kitchen')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_kitchen'>Full kitchen</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_washer_dryer'
                name='amenities'
                value='Washer & Dryer'
                className='mr-2'
                checked={Fields.amenities.includes('Washer & Dryer')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_washer_dryer'>Washer & Dryer</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_free_parking'
                name='amenities'
                value='Free Parking'
                className='mr-2'
                checked={Fields.amenities.includes('Free Parking')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_free_parking'>Free Parking</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_pool'
                name='amenities'
                value='Swimming Pool'
                className='mr-2'
                checked={Fields.amenities.includes('Swimming Pool')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_pool'>Swimming Pool</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_hot_tub'
                name='amenities'
                value='Hot Tub'
                className='mr-2'
                checked={Fields.amenities.includes('Hot Tub')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_hot_tub'>Hot Tub</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_24_7_security'
                name='amenities'
                value='24/7 Security'
                className='mr-2'
                checked={Fields.amenities.includes('24/7 Security')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_24_7_security'>24/7 Security</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_wheelchair_accessible'
                name='amenities'
                value='Wheelchair Accessible'
                className='mr-2'
                checked={Fields.amenities.includes('Wheelchair Accessible')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_wheelchair_accessible'>
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_elevator_access'
                name='amenities'
                value='Elevator Access'
                className='mr-2'
                checked={Fields.amenities.includes('Elevator Access')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_elevator_access'>Elevator Access</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_dishwasher'
                name='amenities'
                value='Dishwasher'
                className='mr-2'
                checked={Fields.amenities.includes('Dishwasher')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_dishwasher'>Dishwasher</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_gym_fitness_center'
                name='amenities'
                value='Gym/Fitness Center'
                className='mr-2'
                checked={Fields.amenities.includes('Gym/Fitness Center')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_gym_fitness_center'>
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_air_conditioning'
                name='amenities'
                value='Air Conditioning'
                className='mr-2'
                checked={Fields.amenities.includes('Air Conditioning')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_air_conditioning'>Air Conditioning</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_balcony_patio'
                name='amenities'
                value='Balcony/Patio'
                className='mr-2'
                checked={Fields.amenities.includes('Balcony/Patio')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_balcony_patio'>Balcony/Patio</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_smart_tv'
                name='amenities'
                value='Smart TV'
                className='mr-2'
                checked={Fields.amenities.includes('Smart TV')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_smart_tv'>Smart TV</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_coffee_maker'
                name='amenities'
                value='Coffee Maker'
                className='mr-2'
                checked={Fields.amenities.includes('Coffee Maker')}
                onChange={handelAmenitisChange}
              />
              <label htmlFor='amenity_coffee_maker'>Coffee Maker</label>
            </div>
          </div>
        </div>

    <div className="mb-4 mt-2">
      <label className="block text-gray-700 font-bold mb-2"
        >transportation</label >
        <select
        id="transportation.type"
        name="transportation.type"
        className="border rounded w-full py-2 px-3 mb-2"
        required
        value={Fields.transportation.type}
        onChange={handleChange}
      >
        <option value="Taxi">Taxi</option>
        <option value="Airport">Airport</option>
        <option value="Train">Train</option>

      </select>
    </div>
    <div>
  <label
    htmlFor="benefits"
    className="block text-gray-700 font-bold mb-2">Package Benefits</label>
  {Fields.benefits.map((benefit, index) => (
    <div key={index}>
      <input
        type="text"
        id={`benefits`}
        name={`benefits`}
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder="eg. Dental Implant Package in Isfahan"
        required
        value={benefit}
        onChange={(e) => {
          const newBenefits = [...Fields.benefits];
          newBenefits[index] = e.target.value;
          SetFields({...Fields, benefits: newBenefits });
        }}
      />
    </div>
  ))}
    <div onClick={handleAddBenefit} className='cursor-pointer mb-4 text-sm'>
        <FaPlusCircle className='mb-1 mr-1 inline'/> <button className='font-bold'>Add Benefit</button>
    </div>
</div>


    

    <div className="mb-4 mt-4" >
      <label
        htmlFor="faq"
        className="block text-gray-700 font-bold mb-2">Package Faq</label>

    </div>

    {Fields.faq.map((faq, index) => (
    <div key={index}>
      <div className="mb-1">
        <input
          type="text"
          id={`faq${index}.question`}
          name={`faq.${index}.question`}
          className="border rounded w-full py-2 px-3"
          placeholder={`Add a FAQ question ${index+1}`}
          required
          value={faq.name}
          onChange={(e) => {
            const newFAQ = [...Fields.faq];
            newFAQ[index].question = e.target.value;
            SetFields({ ...Fields, faq: newFAQ });
          }}
      />
    </div>
    <div className="">
      <input
        type='text'
        id={`faq.${index}.answer`}
        name={`faq.${index}.answer`}
        className="border rounded w-full py-2 px-3 mb-4"
        rows="4"
        placeholder={`Add a FAQ answer ${index+1}`}
        value={faq.description}
        onChange={(e) => {
          const newFAQ = [...Fields.faq];
          newFAQ[index].answer = e.target.value;
          SetFields({ ...Fields, faq: newFAQ });
        }}
      ></input>
    </div>
  </div>
))}
      <div onClick={handleAddFAQ} className='cursor-pointer mb-4 text-sm'>
      <FaPlusCircle className='mb-1 mr-1 inline'/> <button className='font-bold'>Add FAQ</button>
      </div>
   


    <div>
    <div className='mb-4'>
          <label
            htmlFor='images'
            className='block text-gray-700 font-bold mb-2'
          >
            Images (Select up to 4 images)
          </label>
          <input
            type='file'
            id='images'
            name='images'
            className='border rounded w-full py-2 px-3'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="submit">
        Add Package
      </button>
    </div>
  </form>
  )
}

export default AddPackageForm