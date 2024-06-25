import React from 'react'
import PackagesCard from '../../components/PackagesCard'
import { fetchPackages } from '../../utils/requests';


const Packages = async ()=> {

  const properties = await fetchPackages();

  //sort packages by date

  properties.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6 h-full">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {!properties ?(
          <p>No packages found</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {properties.map((property)=>(
            <PackagesCard key={property._id} property={property}/>
          ))}  
          
        </div>
        )}
      </div>
    </section>
  )
}

export default Packages