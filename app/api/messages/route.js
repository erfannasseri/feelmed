import connectDB from '../../../config/database';
import Message from '../../../models/Message';

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();



    const readMessages = await Message.find({ read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      
      .populate('Package', 'title');

    const unreadMessages = await Message.find({
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate('Package', 'title');
      

    const messages = [...unreadMessages, ...readMessages];


    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    
    await connectDB();

    const { Name, Email, Phone, Address, Package, PackageType , Invite } = await request.json();

    const newMessage = new Message({
      Package,
      Name,
      Email,
      Phone,
      Address,
      Invite,
      PackageType
    });


    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
