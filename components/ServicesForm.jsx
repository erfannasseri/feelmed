import React from 'react'

const ServicesForm = () => {
  return (
        <>
              {/* Services */}

              <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
              >Service Title</label>
            <input
              type="text"
              id="services.name"
              name="services.name"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Dental Implant Package in Isfahan"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="services.description"
              className="block text-gray-700 font-bold mb-2">Service Description</label>
            <textarea
              id="services.description"
              name="services.description"
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add an optional description of your Package"
            ></textarea>
          </div>
    </>
  )
}

export default ServicesForm