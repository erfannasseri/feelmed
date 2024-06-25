const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//Fetch All Packages

async function fetchPackages(){
    try {
    if (!apiDomain) {
        return []
    }
      const res = await fetch(`${apiDomain}/packages`)
  
      if (!res.ok) {
        throw new Error('Failed to fethc data');
      }
  
      return res.json();
  
    } catch (error) {
      console.log(error)
      return [];
    }
  }

//Fetch Single Package

async function fetchPackage(id){
    try {
    if (!apiDomain) {
        return null 
        console.log("not Found")
    }
      const res = await fetch(`${apiDomain}/packages/${id}`)
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
  
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  export {fetchPackages , fetchPackage}