import { Dashboard, PeopleAlt } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { theme } from '../../features/auth/pages/LoginPage';


const useStyles = makeStyles({
   root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
   },

   link: {
      color: 'inherit',
      textDecoration: 'none',
      '&.active > div': {
         backgroundColor: theme.palette.action.selected,
      },
   }
});

export function Sidebar() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <List component="nav" aria-label="main mailbox folders">
            <NavLink to='/admin/dashboard' className={classes.link}>
               <ListItem button>
                  <ListItemIcon>
                     <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
               </ListItem>
            </NavLink>
            <NavLink to='/admin/students' className={classes.link}>
               <ListItem button>
                  <ListItemIcon>
                     <PeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
               </ListItem>
            </NavLink>
         </List>
      </div>
   );
}
