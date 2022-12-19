import { useNavigate } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full flex flex-col items-center justify-center z-10 gap-4'>
      <div className='text-7xl text-blue-700'>404</div>
      <button
        onClick={() => {
          navigate('/', { replace: true });
        }}
        className='bg-gray-500 hover:bg-gray-600 rounded-md px-3 py-1 text-white flex items-center gap-2'
      >
        <MdHomeFilled className='text-lg' />
        Back to Schedule
      </button>
    </div>
  );
};

export default NotFound;
