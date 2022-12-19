import { StarProps } from '../utils/types';

const StarRating = ({
  rate,
  fontSize = 16,
  lineHeight = 1.2,
}: StarProps) => {
  return (
    <div data-testid='rating' className='star-rating'>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <div
            key={index}
            className={`${index <= rate ? 'on' : 'off'}`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${lineHeight}rem`,
            }}
          >
            &#9733;
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
