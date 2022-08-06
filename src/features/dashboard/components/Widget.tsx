import { Paper, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { theme } from '../../auth/pages/LoginPage';

export interface WidgetProps {
   title: string
   children: React.ReactNode
}

const useStyles = makeStyles({
   root: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
   }
});

export default function Widget({ title, children }: WidgetProps) {
   const classes = useStyles()
   return (
      <Paper className={classes.root}>
         <Typography variant='button'>{title}</Typography>
         <Box mt={2}>{children}</Box>
      </Paper>
   );
}
