import connectDB from "../../../../../config/database"
import Package from '../../../../../models/Package'

// GET /api/packages/user/:userid
export const GET = async (request,{params}) =>{ 
    try {

        await connectDB();

        const userId = params.userId




        const packages = await Package.find({});



        return new Response(JSON.stringify(packages) , {status:200})
    } catch (error) {
        return new Response(`Smothing went wrong  ${error}` , {status:403})
    }
}