import { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import { fetch_schedules } from '../../store/reducer/setting';
import {
  ITEM_PER_PAGE,
  PAGE_RANGE,
} from '../../utils/constants';
import Show from './show';

const Schedule = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isScheduleFetching, schedules, error } =
    useAppSelector((state) => state.setting);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + ITEM_PER_PAGE;
  const [currentItems, setCurrentItems] = useState<any>(
    schedules.slice(itemOffset, endOffset)
  );

  useEffect(() => {
    dispatch(fetch_schedules());
  }, []);

  useEffect(() => {
    if (error.value) navigate('/error');
  }, [error]);

  useEffect(() => {
    const res = schedules.slice(itemOffset, endOffset);
    setCurrentItems(res);
  }, [itemOffset, schedules]);

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * ITEM_PER_PAGE) % schedules.length;
    setItemOffset(newOffset);
    containerRef.current &&
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
  };

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex flex-col gap-6 z-10'
    >
      <div className='w-full sm:w-[45%] py-6 flex flex-col text-lg font-semibold text-gray-400'>
        <div>TV Show and web series database.</div>
        <div>
          Create personalised schedules. Episode guide, case,
          crew and character information
        </div>
      </div>
      <div className='w-full h-fit flex flex-col gap-5'>
        <div className='w-fit h-1/6 text-lg font-medium tracking-wider flex items-center'>
          Last Added Shows
        </div>
        <div className='w-full h-fit flex flex-wrap gap-x-6 sm:gap-x-12 gap-y-6 rounded-md'>
          {isScheduleFetching ? (
            <div className='w-full h-full flex items-center justify-center py-10'>
              <div className='w-10 h-10 rounded-full border-t-2 border-gray-600 animate-spin self-center'></div>
            </div>
          ) : schedules.length === 0 ? (
            <div className='text-sm font-bold text-blue-600 w-full h-full flex items-center'>
              No schedules found
            </div>
          ) : (
            currentItems.map((schedule: any, idx: number) => (
              <Show
                key={idx}
                id={schedule?.show?.id ?? ''}
                name={schedule?.show?.name ?? ''}
                url={schedule?.show?.image?.medium ?? ''}
                summary={schedule?.show?.summary}
                rating={schedule?.show?.rating?.average ?? 0}
              />
            ))
          )}
        </div>
        {!isScheduleFetching && schedules.length !== 0 && (
          <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={PAGE_RANGE}
            pageCount={Math.ceil(
              schedules.length / ITEM_PER_PAGE
            )}
            previousLabel='< previous'
            disabledClassName='text-gray-400'
            activeClassName='bg-blue-600 px-1 rounded-sm text-white'
            className='w-fit bg-gray-200 px-4 py-1 rounded text-sm font-semibold flex items-center gap-4 my-4 self-center'
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
