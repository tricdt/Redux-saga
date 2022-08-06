import { Box, Button, CircularProgress, createTheme, Paper, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectIsLogging } from "../authSlice";
export const theme = createTheme({
   spacing: 4,
});

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
   },
   box: {
      padding: theme.spacing(10)
   }
});

export interface LoginPageProps {
}

export default function LoginPage(props: LoginPageProps) {
   const classes = useStyles();
   const dispatch = useAppDispatch();
   const isLogging = useAppSelector(selectIsLogging)
   const handleLoginClick = () => {
      // TODO: Get username + pwd from login form
      dispatch(
         authActions.login({
            username: '',
            password: '',
         })
      );
   };
   return (
      <div className={classes.root}>
         <Paper elevation={10} className={classes.box}>
            <Typography variant="h5" component="h1">
               Student Management
            </Typography>

            <Box mt={4}>
               <Button fullWidth variant="contained" color="primary"
                  onClick={handleLoginClick}
               >
                  {isLogging &&
                     <CircularProgress size={20} color='secondary'
                     />} &nbsp; Fake Login
               </Button>
            </Box>
         </Paper>
      </div>
   );
}
