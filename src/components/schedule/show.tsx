import { useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import errorImg from '../../assets/images/broken.png';
import { ShowProps } from '../../utils/types';
import StarRating from '../starRating';

const Show = ({ id, url, name, rating, summary }: ShowProps) => {
  const navigate = useNavigate();
  return (
    <div
      data-testid={id}
      className='w-[45%] sm:1/4 md:w-1/5 xl:w-1/6 h-fit flex flex-col rounded-md cursor-pointer'
      onClick={() => {
        navigate(`/${id}`);
      }}
    >
      <img
        className='w-full h-56 object-cover bg-gray-200 rounded-t-md hover:scale-125 ease-in-out duration-300'
        src={url}
        alt={name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = errorImg;
        }}
      />
      <StarRating rate={rating / 2} />
      <div
        data-testid='summary'
        className='text-xs font-semibold line-clamp-3 p-1 rounded-b-md'
      >
        {parser(String(summary ?? ''))}
      </div>
    </div>
  );
};

export default Show;
