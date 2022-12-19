import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateError } from '../store/reducer/setting';

const Error = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    setting: { error },
  } = useAppSelector((state) => state);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center z-10 gap-4'>
      <div className='text-7xl text-red-700'>
        {error.message}
      </div>
      <button
        onClick={() => {
          navigate('/', { replace: true });
          dispatch(updateError({ value: false, message: '' }));
        }}
        className='bg-gray-500 hover:bg-gray-600 rounded-md px-3 py-1 text-white flex items-center gap-2'
      >
        <MdError className='text-lg' />
        Back to Schedule
      </button>
    </div>
  );
};

export default Error;
