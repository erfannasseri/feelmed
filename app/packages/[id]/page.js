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
import ShareButton from '../../../components/ShareButton'
import BookingForm from '../../../components/BookingForm'


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
          <aside className="space-y-4 scroll-pr-48">       
            <ShareButton Packages={Package}/>

            {/* <!-- Contact Form --> */}
            <BookingForm  Packages={Package}/>
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