import { BsFillPersonFill } from 'react-icons/bs';
import { StarringProps } from '../../utils/types';

const StarringItem = ({ person, role }: StarringProps) => {
  return (
    <div
      data-testid='starring'
      className='w-full flex items-center text-base py-2 border-b-2 pl-2 border-gray-500'
    >
      <div
        data-testid='person'
        className='w-2/3 text-gray-700 font-medium flex items-center gap-4'
      >
        <span className='bg-gray-300 rounded-full p-1.5'>
          <BsFillPersonFill className='text-white' />
        </span>
        {person}
      </div>
      <div data-testid='role' className='w-1/3 text-gray-400'>
        {role}
      </div>
    </div>
  );
};

export default StarringItem;
