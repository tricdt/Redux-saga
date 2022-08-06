import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { theme } from '../../auth/pages/LoginPage';

export interface StatisticItemProps {
   icon: React.ReactElement;
   label: string;
   value?: string | number;
}

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(4),
      border: `1px solid ${theme.palette.divider}`,

   }
});

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
   const classes = useStyles();

   return (
      <Paper className={classes.root}>
         <Box>{icon}</Box>
         <Box>
            <Typography variant="h5" align="right">
               {value}
            </Typography>
            <Typography variant="caption">{label}</Typography>
         </Box>
      </Paper>
   );
}
