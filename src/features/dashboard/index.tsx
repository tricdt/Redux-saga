import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { theme } from '../auth/pages/LoginPage';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
   dashboardActions, selectDashboardStatistics,
   selectDashboardLoading,
   selectHighestStudentList,
   selectLowestStudentList,
   selectRankingByCityList
} from './dashboardSlice';

const useStyles = makeStyles({
   root: {
      position: 'relative',
      paddingTop: theme.spacing(1),
   },
   loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
   },
});

export default function Dashboard() {
   const classes = useStyles();
   const dispatch = useAppDispatch()

   const statistics = useAppSelector(selectDashboardStatistics);
   const loading = useAppSelector(selectDashboardLoading);
   const highestStudentList = useAppSelector(selectHighestStudentList);
   const lowestStudentList = useAppSelector(selectLowestStudentList)
   const rankingByCityList = useAppSelector(selectRankingByCityList)
   useEffect(() => {
      dispatch(dashboardActions.fetchData())
   }, [dispatch])
   return (
      <Box className={classes.root}>
         {loading && <LinearProgress className={classes.loading} />}
         <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<PeopleAlt fontSize="large" color="primary" />}
                  label="male"
                  value={statistics.maleCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<ChatRounded fontSize="large" color="primary" />}
                  label="female"
                  value={statistics.femaleCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<ChatBubble fontSize="large" color="primary" />}
                  label="mark >= 8"
                  value={statistics.highMarkCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<LinearScaleSharp fontSize="large" color="primary" />}
                  label="mark <= 5"
                  value={statistics.lowMarkCount}
               />
            </Grid>
         </Grid>
         <Box mt={5}>
            <Typography variant='h4'>All students</Typography>
            <Box mt={2}>
               <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                     <Widget title="Student with highest mark">
                        <StudentRankingList studentList={highestStudentList} />
                     </Widget>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                     <Widget title="Student with lowest mark">
                        <StudentRankingList studentList={lowestStudentList} />
                     </Widget>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Box mt={5}>
            <Typography variant='h4'>Ranking by city</Typography>
            <Box mt={2}>
               <Grid container spacing={3}>
                  {rankingByCityList.map((ranking) => (
                     <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                        <Widget title={ranking.cityName}>
                           <StudentRankingList studentList={ranking.rankingList} />
                        </Widget>
                     </Grid>
                  ))}
               </Grid>
            </Box>
         </Box>
      </Box>
   );
}
