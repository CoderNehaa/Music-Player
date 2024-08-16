
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/custom/Navbar';
import { authentication } from './redux/reducers/userReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
    <div className='h-screen w-screen m-0 p-0'>
      <RouterProvider router={routes}/>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App
