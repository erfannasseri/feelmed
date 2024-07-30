"use client"
import { useState } from 'react'
import React from 'react'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BookingForm = ({Packages}) => {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Invite, setInviteCode] = useState('');
  const [Address, setAddress] = useState('');
  const [wasSubmited, setWasSubmited] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const data = {
      Name,
      Email,
      Phone,
      Address,
      Invite,
      Package: Packages._id,
      PackageType: Packages.packageType
    }
    try {
      const res = await fetch('/api/messages' ,{
        method:'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(data)
      } 
      )
      if (res.status === 200) {
        toast.success("Your information has been sent successfully.")
        setWasSubmited(true)
      }else if (res.status === 400) {
        toast.error(data.message)
      }else{
        toast.error("Error sending form")
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form")
    } finally{
      setAddress('')
      setEmail('')
      setInviteCode('')
      setName('')
      setPhone('')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Package Booking</h3>
              {wasSubmited ?(
                <>
                <p className='text-gray-500 ' >Your information has been sent <span className='text-green-500 font-bold'>successfully</span>.</p>
                <p className='text-gray-500 mb-4' >We will contact you soon.</p>
                <FaCheckCircle className='m-auto text-green-500 text-4xl '/>
                </>
              )  :   (

              <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='block text-gray-500 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Enter your name'        
                  value={Name} 
                  onChange={(e)=>setName(e.target.value)}    
                  required
                />
              </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={Email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    placeholder="Enter your email"
                    required
                    />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                    >
                    Phone:
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                    value={Phone} 
                    onChange={(e)=>setPhone(e.target.value)} 
                    
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                    >
                    Invite Code:
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='invite'
                    type='text'
                    placeholder='Enter your invite code'
                    value={Invite} 
                    onChange={(e)=>setInviteCode(e.target.value)} 
                    
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Address:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="address"
                    placeholder="Enter your address"
                    value={Address} 
                    onChange={(e)=>setAddress(e.target.value)} 
                  ></textarea>
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <FaPaperPlane className='mr-2'/> Submit
                  </button>
                </div>
              </form>
              )}
            </div>
  )
}

export default BookingForm