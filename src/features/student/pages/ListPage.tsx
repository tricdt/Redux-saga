import { Box, Button, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Student } from '../../../models';
import customHistory from '../../../utils/history';
import { theme } from '../../auth/pages/LoginPage';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentActions } from '../studentSlice';

const useStyles = makeStyles({
   root: {
      position: 'relative',
      paddingTop: theme.spacing(1),
   },

   titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: theme.spacing(4),
   },

   loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
   },
});



export default function ListPage() {
   const classes = useStyles()
   const dispatch = useAppDispatch()
   const { pathname } = useLocation();
   const filter = useAppSelector(selectStudentFilter)
   const studentList = useAppSelector(selectStudentList)
   const cityList = useAppSelector(selectCityList)
   const cityMap = useAppSelector(selectCityMap)
   const pagination = useAppSelector(selectStudentPagination);

   useEffect(() => {
      dispatch(studentActions.fetchStudentList(filter))
   }, [dispatch, filter])
   const handleEditStudent = async (student: Student) => {
      customHistory.push(`${pathname}/${student.id}`)
      // history.push(`${match.url}/${student.id}`);
   };
   const handleRemoveStudent = async (student: Student) => {
      try {
         // Remove student API
         await studentApi.remove(student?.id || '');

         toast.success('Remove student successfully!');

         // Trigger to re-fetch student list with current filter
         const newFilter = { ...filter };
         dispatch(studentActions.setFilter(newFilter));
      } catch (error) {
         // Toast error
         console.log('Failed to fetch student', error);
      }
   }
   const handlePageChange = (e: any, page: number) => {
      dispatch(
         studentActions.setFilter({
            ...filter,
            _page: page,
         })
      );
   };
   const handleFilterChange = (newFilter: ListParams) => {
      dispatch(studentActions.setFilter(newFilter));
   };
   const handleSearchChange = (newFilter: ListParams) => {
      dispatch(studentActions.setFilterWithDebounce(newFilter));
   };
   return (
      <Box className={classes.root}>
         <Box className={classes.titleContainer}>
            <Typography variant="h4">Students</Typography>
            <Link to='add' style={{ textDecoration: 'none' }}>
               <Button variant="contained" color="primary">
                  Add new student
               </Button>
            </Link>
         </Box>
         <Box mb={3}>
            <StudentFilters
               filter={filter}
               cityList={cityList}
               onChange={handleFilterChange}
               onSearchChange={handleSearchChange}
            />
         </Box>
         <StudentTable
            studentList={studentList}
            cityMap={cityMap}
            onEdit={handleEditStudent}
            onRemove={handleRemoveStudent}
         />
         <Box my={2} display="flex" justifyContent="center">
            <Pagination
               color="primary"
               count={Math.ceil(pagination._totalRows / pagination._limit)}
               page={pagination?._page}
               onChange={handlePageChange}
            />
         </Box>
      </Box>
   );
}
