import { Button } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { NotFound, PrivateRoute } from './components/common';
import AdminLayout from './components/Layout/Admin';
import { authActions } from './features/auth/authSlice';
import LoginPage from './features/auth/pages/LoginPage';
function App() {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   cityApi.getAll().then((response) => console.log(response));
  // }, []);
  // useEffect(() => {
  //   studentApi.getAll({
  //     _page: 1,
  //     _limit: 5,
  //     _sort: '',
  //     _order: 'asc'
  //   }).then((response) => console.log(response));
  // }, []);

  return (
    <>

      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='admin/*'
          element={
            <PrivateRoute redirectTo='/login'>
              <AdminLayout />
            </PrivateRoute>
          }
        />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
