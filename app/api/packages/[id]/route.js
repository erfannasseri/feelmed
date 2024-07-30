import connectDB from "../../../../config/database"
import Package from '../../../../models/Package'
import {getSessionUser} from '../../../../utils/getSessionUser'

// GET /api/packages/:id
export const GET = async (request,{params}) =>{
    try {

        await connectDB();
        
        const pack = await Package.findById(params.id);
        if (!pack) {
            return new Response ('Package not found',{status:404})
        }

        return new Response(JSON.stringify(pack) , {status:200})
    } catch (error) {
        return new Response(`Smothing went wrong  ${error}` , {status:403})
    }
}
export const DELETE = async (request,{params}) =>{
    try {
        
        const PackageID = params.id
        const SessionUser = await getSessionUser()
        await connectDB();
        

        const pack = await Package.findById(PackageID);
        if (!pack) {
            return new Response ('Package not found',{status:404})
        }

        await pack.deleteOne()

        return new Response("Package Deleted" , {status:200})
    } catch (error) {
        return new Response(`Smothing went wrong  ${error}` , {status:403})
    }
}

export const PUT = async (request,{params})=>{
    try {

        const {id} = params
        const formData = await request.formData();
        
        const amenities = formData.getAll('amenities');
        const benefits = formData.getAll('benefits');

        const faq = [];
        for (let i = 0; i <= formData.getAll(`faq.${i}.question`).length; i++) {
          faq.push({
            question: formData.get(`faq.${i}.question`),
            answer: formData.get(`faq.${i}.answer`),
          });
        }
        
        
        const services = [];
        for (let i = 0; i <= formData.getAll(`services.${i}.name`).length; i++) {
          services.push({
            name: formData.get(`services.${i}.name`),
            description: formData.get(`services.${i}.description`),
          });
        }
        
        
        
        
                const packageData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            packageType: formData.get('packageType'),
            totalPrice: formData.get('totalPrice'),

            accommodation:{
                type: formData.get('accommodation.type'),
                name: formData.get('accommodation.name'),
                stars: formData.get('accommodation.stars'),
                location: formData.get('accommodation.location'),   
                description: formData.get('accommodation.description'),   
                amenities         
            },
            doctor:{
                name: formData.get('doctor.name'),
                description: formData.get('doctor.description'),
            },
            transportation:{                
                type: formData.get('transportation.type'),   
            },
            duration: formData.get('duration'),   
            benefits,
            faq,
            services
        }
        

        await connectDB();
        const newPackage = await Package.findByIdAndUpdate(id,{
            ...packageData,
            services: services.map((service) => ({ name: service.name, description: service.description })),
            faq: faq.map((faq) => ({ question: faq.question, answer: faq.answer })),
          });
        


        return Response.redirect(`${process.env.NEXTAUTH_URL}/packages/${newPackage._id}`);
        //return new Response(JSON.stringify({message:packageData},{status:200}))
    } catch (error) {
        console.log(error)
        return new Response(`${error}`, {status:500})
        
    }
}