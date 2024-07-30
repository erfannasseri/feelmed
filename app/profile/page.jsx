'use client'
import { useState , useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ProfileDefault from '../../assets/images/profile.png'
import Spinner from '../../components/Spinner'
import { FaMedal ,FaMapMarker } from 'react-icons/fa'
import { toast } from 'react-toastify';


const ProfilePage = () => {

    const{data:session}=useSession()
    const profileImage = session?.user?.image
    const profileName = session?.user?.name
    const profileEmail = session?.user?.email

    const [Packages, setPackages] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUserPackage = async (userId) =>{
            if (!userId) {
                return;
            }
                try {
                    const res = await fetch(`/api/packages/user/${userId}`);
                    if (res.status === 200) {
                        const data = await res.json();
                        setPackages(data)
                    }
                } catch (error) {
                    console.log(error);
                }
                finally{
                    setLoading(false)
                }
        }
        if (session?.user?.id) {
            fetchUserPackage(session.user.id)
        }
    },[session]);

   
    const handleDeletePackage = async (Package) =>{
        
      const confirmed = window.confirm(
        'Are you sure you want to delete this Package?'
      );
  
      if (!confirmed) return;
  
      try {
        const res = await fetch(`/api/packages/${Package._id}`, {
          method: 'DELETE',
        });
  
        if (res.status === 200) {
          // Remove the property from state
          const updatedPackages = Packages.filter(
            (Pack) => Pack._id !== Package._id
          );
  
          setPackages(updatedPackages);
  
          toast.success('Package Deleted');
         
        } else {
          toast.error('Failed to delete Package');
          
        }
      } catch (error) {
        console.log(error);
        
        toast.error('Failed to delete Package');
      }
        
    }

  return (
    /* <!-- Profile Section --> */
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Package Manager</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx- mt-10 mb-4">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || ProfileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text- mb-4"><span className="font-bold block">Name: </span>{profileName}</h2>
              <h2 className="text-lg"><span className="font-bold block">Email: </span> {profileEmail}</h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Packages</h2>
              {!Loading && Packages.length === 0 && (
                <p>No Packages</p>
              )}

              { Loading ? <Spinner loading={Loading}/> : (

                Packages.map((Package)=>(
                    
              <div key={Package._id} className="mb-10">
                <Link href={`/packages/${Package._id}`}>
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={Package.images[0]}
                    alt="Property 1"
                    width={500}
                    height={100}
                    priority= {true}
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{Package.title}</p>
                  <div className="text-sm font-bold">
                    <FaMedal 
                    className={`
                    inline mr-1 ' ${Package.packageType === 'Gold' && 'text-yellow-500'}
                    ${Package.packageType === 'Silver' && 'text-gray-400'}
                    ${Package.packageType === 'Bronze' && 'text-brown-700'}
                    `}/>{Package.packageType}
                    <i className="fa fa-xmark text-red-700"></i>
                  </div>
                  <p className="text-gray-600 text-sm font-bold"> <FaMapMarker className=' inline mb-1'/> {Package.accommodation.location}</p>
                </div>
                <div className="mt-2">
                  <Link href={`/packages/${Package._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                    onClick={()=> handleDeletePackage(Package)}
                  >
                    Delete
                  </button>
                </div>
              </div>
                ))

              ) }

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage