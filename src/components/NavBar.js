import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';

import { Link } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      <Link to='/'>
        <ListItem className='logo' key='Home'>
          <h4>The Nav</h4>
        </ListItem>
      </Link>

      <div onClick={handleDrawerOpen} className='burger'>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <List className='sidenav'>
          <Link to='/'>
            <ListItem className='sidenav-link' button key='Home'>
              <h3>Home</h3>
            </ListItem>
          </Link>
          <Link to='/tendencias'>
            <ListItem className='sidenav-link' button key='Mas visto'>
              <h3>Mas visto</h3>
            </ListItem>
          </Link>
          <Link to='/top_rated'>
            <ListItem className='sidenav-link' button key='Mejor valoracion'>
              <h3>Mejor valoracion</h3>
            </ListItem>
          </Link>
          <Link to='/popular'>
            <ListItem className='sidenav-link' button key='Popular'>
              <h3>Popular</h3>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </nav>
  );
}
