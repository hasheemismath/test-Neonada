import { InfoProps } from '../../utils/types';

const InfoItem = ({ title, value }: InfoProps) => {
  return (
    <div
      data-testid='infoItem'
      className='w-full flex items-center text-base py-2.5 border-b-2 border-gray-500'
    >
      <div
        data-testid='title'
        className='w-1/4 text-gray-700 font-medium'
      >
        {title}
      </div>
      <div data-testid='value' className='w-3/4 text-gray-400'>
        {value.toString()}
      </div>
    </div>
  );
};

export default InfoItem;
