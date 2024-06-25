import { request } from "https";
import connectDB from "../../../config/database"
import Package from '../../../models/Package'
import { getServerSession } from "next-auth/next";
import cloudinary from "../../../config/cloudinary";

// GET /api/packages
export const GET = async (request) =>{ 
    try {

        await connectDB();
        
        const packages = await Package.find({});



        return new Response(JSON.stringify(packages) , {status:200})
    } catch (error) {
        return new Response(`Smothing went wrong  ${error}` , {status:403})
    }
}

export const POST = async (request)=>{
    try {

        const formData = await request.formData();
        const images = formData
        .getAll('images')
        .filter((image) => image.name !== '');
        const amenities = formData.getAll('amenities');
        const benefits = formData.getAll('benefits');
        console.log(benefits);
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
            images,
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
        //UPLOAD IMAGE(S) TO CLOADINARY
        const imageUploadPromises = [];
        for (const image of images) {
          const imageBuffer = await image.arrayBuffer();
          const imageArray = Array.from(new Uint8Array(imageBuffer));
          const imageData = Buffer.from(imageArray);
    
          // Convert the image data to base64
          const imageBase64 = imageData.toString('base64');
    
          // Make request to upload to Cloudinary
          const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
              folder: 'Packages',
            }
          );
    
          imageUploadPromises.push(result.secure_url);
    
          // Wait for all images to upload
          const uploadedImages = await Promise.all(imageUploadPromises);
          // Add uploaded images to the packageData object
          packageData.images = uploadedImages;
        }
    
        
/*         faq: {
            question: formData.get('services.name'),
            answer: formData.get('services.description'),
        }, */
/*         services: {
            name: formData.get('services.name'),
            description: formData.get('services.description'),
          }, */
        
        await connectDB();
        const newPackage = await Package.create({
            ...packageData,
            services: services.map((service) => ({ name: service.name, description: service.description })),
            faq: faq.map((faq) => ({ question: faq.question, answer: faq.answer })),
          });
        
        console.log(packageData.images);
        console.log(images);

        return Response.redirect(`${process.env.NEXTAUTH_URL}/packages/${newPackage._id}`);
        //return new Response(JSON.stringify({message:packageData},{status:200}))
    } catch (error) {
        console.log(error)
        return new Response('Failed to add', {status:500})
        
    }
}