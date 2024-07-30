'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
 import { useGlobalContext } from '../context/GlobalContext'; 

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

   //const { setUnreadCount } = useGlobalContext(); 

   const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        //setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success('Marked as read');
        } else {
          toast.success('Marked as new');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }; 

   const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);
        //setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Message Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted');
    }
  }; 

  if (isDeleted) {
    return null;
  }

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full h-4 '>
          
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.Package.title}
      </h2>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {message.Name}
        </li>
        <li>
          <strong>Invited by :</strong> {message.Invite}
        </li>

        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.Email}`} className='text-blue-500'>
            {message.Email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.Phone}`} className='text-blue-500'>
            {message.Phone}
          </a>
        </li>
        <li>
          <strong>Address:</strong>{' '}
          <a className='text-gray-700'>{message.Address}</a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
        } py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
  );
};
export default Message;
