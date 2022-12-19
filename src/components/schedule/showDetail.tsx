import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import { fetch_show } from '../../store/reducer/setting';
import InfoItem from './infoItem';
import StarringItem from './starringItem';
import StarRating from '../starRating';

const ShowDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isShowFetching, show, error } = useAppSelector(
    (state) => state.setting
  );

  useEffect(() => {
    if (id) dispatch(fetch_show(id));
  }, [id]);

  useEffect(() => {
    if (error.value) navigate('/error');
  }, [error]);

  return (
    <div className='w-full h-full flex flex-col items-center py-6 gap-6 justify-center z-10'>
      {isShowFetching ? (
        <div className='flex flex-col self-center gap-2'>
          <div className='w-12 h-12 border-gray-500 border-t-2 rounded-full animate-spin'></div>
          <div className='font-bold animate-pulse'>
            Loading...
          </div>
        </div>
      ) : (
        <>
          <div className='w-full h-fit sm:h-3/5 flex flex-col sm:flex-row'>
            <div className='w-full sm:w-1/5 h-full relative'>
              <img
                className='block sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-0 w-full h-80 sm:h-60 object-cover rounded'
                src={show?.image?.medium}
                alt={show?.name}
              />
            </div>
            <div className='w-full sm:w-4/5 h-full flex flex-col justify-center px-0 sm:px-8 gap-1'>
              <div className='flex items-start gap-1'>
                <StarRating
                  rate={(show?.rating?.average ?? 0) / 2}
                  fontSize={26}
                  lineHeight={1}
                />
                <div className='text-sm font-semibold'>{`${
                  show?.rating?.average ?? 0
                }/10`}</div>
              </div>
              <div className='text-4xl font-bold'>
                {show?.name}
              </div>
              <div className='text-base font-medium line-clamp-4'>
                {parser(String(show?.summary ?? ''))}
              </div>
            </div>
          </div>
          <div className='w-full h-fit sm:h-2/5 flex flex-col sm:flex-row gap-10'>
            <div className='w-full sm:w-1/2 h-full flex flex-col gap-3'>
              <div className='text-lg font-semibold'>
                Show Info
              </div>
              <div className='w-full h-full flex flex-col'>
                {[
                  {
                    title: 'Streamed on',
                    value: show?.network?.name ?? '',
                  },
                  {
                    title: 'Schedule',
                    value: show?.schedule?.days ?? [],
                  },
                  { title: 'Status', value: show?.status ?? '' },
                  { title: 'Genres', value: show?.genres ?? [] },
                ].map((item, idx) => (
                  <InfoItem
                    key={idx}
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            <div className='w-full sm:w-1/2 h-full flex flex-col gap-3'>
              <div className='text-lg font-semibold'>
                Starring
              </div>
              <div className='w-full h-full flex flex-col overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
                {show?._embedded?.cast?.length === 0 ? (
                  <div className='text-lg font-semibold text-blue-600 self-center py-10'>
                    Couldn't find any actor!
                  </div>
                ) : (
                  show?._embedded?.cast.map(
                    (
                      item: {
                        person: { name: string };
                        character: { name: string };
                      },
                      idx: number
                    ) => (
                      <StarringItem
                        key={idx}
                        person={item.person.name}
                        role={item.character.name}
                      />
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowDetail;
