import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/error';
import Header from './components/header';
import Schedule from './components/schedule';
import ShowDetail from './components/schedule/showDetail';
import NotFound from './components/_404';

function App() {
  return (
    <div className='w-full h-full sm:h-screen flex flex-col px-8 sm:px-16 py-6 sm:py-12 relative'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Schedule />} />
          <Route path='/:id' element={<ShowDetail />} />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className='absolute top-0 left-0 w-full h-1/2 bg-gray-200 z-0'></div>
    </div>
  );
}

export default App;
