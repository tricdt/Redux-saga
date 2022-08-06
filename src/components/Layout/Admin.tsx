import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { theme } from '../../features/auth/pages/LoginPage';
import Dashboard from '../../features/dashboard';
import StudentFeature from '../../features/student';
import { Header, Sidebar } from '../common';


const useStyles = makeStyles({
   root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '240px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,
      minHeigh: '100vh'
   },
   header: {
      gridArea: 'header'
   },
   sidebar: {
      gridArea: 'sidebar',
      borderRight: '1px solid ${theme.palette.divider}',
      backgroundColor: theme.palette.background.paper,

   },
   main: {
      gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 3),
   }
});
export default function AdminLayout() {
   const classes = useStyles()
   return (
      <Box className={classes.root}>
         <Box className={classes.header}>
            <Header />
         </Box>
         <Box className={classes.sidebar}>
            <Sidebar />
         </Box>
         <Box className={classes.main}>
            <Routes>
               <Route path='dashboard' element={<Dashboard />} />
               <Route path='students/*' element={<StudentFeature />} />
            </Routes>
         </Box>
      </Box>
   );
}
