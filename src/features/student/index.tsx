import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export interface StudentFeatureProps {
}

export default function StudentFeature(props: StudentFeatureProps) {
   const dispatch = useAppDispatch();

   React.useEffect(() => {
      dispatch(cityActions.fetchCityList());
   }, [dispatch]);
   return (
      <Routes>
         <Route path='add' element={<AddEditPage />} />
         <Route path=':studentId' element={<AddEditPage />} />
         <Route path='' element={<ListPage />} />
      </Routes>
   );
}
