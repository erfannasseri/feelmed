"use client"
import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPackage } from '../../../utils/requests';
import PackageHeaderImage from '../../../components/PackageHeaderImage';
import Link from 'next/link';
import PackageDetails from '../../../components/PackageDetails';
import PackageImages from '../../../components/PackageImages';
import {FaArrowLeft , FaPaperPlane} from 'react-icons/fa'
import Spinner from '../../../components/Spinner';


function PackagePage() {

  const { id } = useParams();
  
  const [Package, setPackage] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPackData = async ()=>{
      if(!id) {
        return;
      }

      try {
        const pack = await fetchPackage(id)
        setPackage(pack)
      } catch (error) {
        console.error('Error fetching package: ',error)
      }finally{
        setLoading(false)
        
      }
    }

    if (Package === null) {
      fetchPackData()
    }
  },[id,Package] );
  console.log(Package)
  if(!Package && !Loading ){
    return <h1 className='text-center text-2xl font-bold mr-10' > Package not found </h1>
  }

  return (
    <>
    {Loading && <Spinner loading={Loading}/>}
    {!Loading && Package && (
      <>

      <PackageHeaderImage image={Package.images}/>
      {Package.image}

      <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/packages"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className='mr-2'/> Back to Packages {Package.image}
        </Link>
      </div>
    </section>

    {/* <!-- Property Info --> */}
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

          <PackageDetails Package={Package} />

          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">       
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <i className="fas fa-bookmark mr-2"></i> Bookmark Property
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <i className="fas fa-share mr-2"></i> Share Property
            </button>

            {/* <!-- Contact Form --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Book this package</h3>
              <form>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Enter your name'             
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
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
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
            </div>
          </aside>
        </div>
      </div>
    </section>
    <PackageImages images={Package.images}/>

      </>)}
    
    
    </>
  )
}

export default PackagePage