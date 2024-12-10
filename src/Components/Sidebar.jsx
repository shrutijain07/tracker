import React, {useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSelector } from 'react-redux';
const drawerWidth = 260;
const sidebarTexts = [
    { path: '/activity', name: 'Activity Tracker' },
    { path: '/leave-tracker', name: 'Leave Application' },
    { path: '/comp-off', name: 'Comp-off Application' }
];

export default function Sidebar(props) {
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const activityCount = useSelector(state=>state)
    console.log('%c [ activityCount ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', activityCount)

    async function handleLogout(){
      setError('')
      try{
        await logout()
        navigate('/login')
      }
      catch(error){
        console.log('%c [ error ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', error)
        setError("Failed to log out")
      }
    }

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div className='d-flex flex-column'>
            <Toolbar className='h4 fw-bold'>DAILY TRACKER</Toolbar>
            <Divider />
            <List>
                {sidebarTexts.map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton component={Link} to={text.path}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List style={{position: 'absolute', width: '100%', bottom: '20px'}}>
                {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open>
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
