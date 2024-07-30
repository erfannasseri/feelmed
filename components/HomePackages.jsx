import React from 'react'
//import properties from './properties.json'
import PackagesCard from './PackagesCard'
import Link from 'next/link';
import { fetchPackages } from '../utils/requests';


const HomePackages = async () => {

    const properties = await fetchPackages();
    const recentPackages = properties.sort(()=>Math.random()-Math.random()).slice(0,3);
  
  return (
    <>
   
    <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                Recent Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPackages === 0 ? (
                    <p>
                        No packages found
                    </p>
                ):
                recentPackages.map((recentPackage)=> (
                    <PackagesCard key={recentPackage._id}  property={recentPackage} />
                ))
                }
            </div>
        </div>
    </section>
    <section className ="m-auto max-w-lg my-10 px-6">
      <Link
        href="/packages"
        className ="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Properties
      </Link>
    </section>
    </>
  )
}

export default HomePackages