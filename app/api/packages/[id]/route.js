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