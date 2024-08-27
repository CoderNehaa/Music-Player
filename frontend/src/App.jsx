import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Playlists from "./pages/Playlists";
import Favorites from "./pages/Favorites";
import Navbar from './components/custom/Navbar';

import { authentication } from './redux/reducers/userReducer';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Navbar />,
      children:[
        {
          index:true,
          element:<Home />
        },
        {
          path:"/playlists",
          element:<Playlists />
        },
        {
          path:"/favorites",
          element:<Favorites />
        },
        {
          path:'/auth',
          element:<Auth />
        }
      ]
    }, 
  ]);

  useEffect(() => {
    dispatch(authentication());
  }, []);

  return (
    <div className='min-h-screen h-full w-screen m-0 p-0 bg-slate-100 dark:bg-slate-900 dark:text-slate-400'>
      <RouterProvider router={routes}/>
      <ToastContainer autoClose={3000} newestOnTop={true} />
    </div>
  )
}

export default App
