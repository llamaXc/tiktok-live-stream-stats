/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import './Dashboard.scss';
import { useNavigate } from "react-router-dom";
import storeState from '../../state/store'

interface PageProps {
    children: ReactNode,
    title: string,
  }

interface MenuItem {
    displayName: string,
    hashLocation: string
}

interface RoomStatLabel {
  metric: number,
  prefix: string,
  rawValueMax: number
  decimalPlaces: number
}

const RoomStatLabel: React.FC<RoomStatLabel> = ({metric, prefix, rawValueMax, decimalPlaces}) => {
  let formattedNumber = `${metric}`
  if (metric >= rawValueMax){
    formattedNumber = `${(metric / rawValueMax).toFixed(decimalPlaces)}K`;
  }

  if (metric > 1000000){
        formattedNumber = `${(metric / 1000000).toFixed(2)}M`;
  }
  return   <span style={{"marginRight": "40px"}}>{prefix} {formattedNumber}  </span>
}

const Dashboard: React.FC<PageProps> = ({children, title}) =>  {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const followersGained = storeState((state) => state.followersGained)
  const totalLikes = storeState((state) => state.likes)
  const totalViewers = storeState((state) => state.viewers)
  const connectedStream = storeState((state) => state.connectedStreamUsername)
  const resetStore = storeState((state) => state.resetState)


  const menuItemTitles: MenuItem[] = [
      {displayName: "Dashboard", hashLocation: "/dashboard"}, 
      {displayName: "VR", hashLocation: "/dashboard-vr"},
      {displayName: "Scoreboard", hashLocation: "/dashboard-scoreboard"},
    ]

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  const disconnect = () => {
    window.location.hash="/"
    const ipcRenderer = (window as any).ipcRenderer
    resetStore()
    ipcRenderer.send("disconnect")
  }

  const navigate = useNavigate()
  
  return (
    <Box>
      <AppBar variant="elevation" color="secondary" position="static" >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            <RoomStatLabel decimalPlaces={1} metric={totalViewers} prefix={"👀"} rawValueMax={1000}/>
            <RoomStatLabel decimalPlaces={0} metric={totalLikes} prefix={"❤️"} rawValueMax={1000}/>
            <RoomStatLabel decimalPlaces={1} metric={followersGained} prefix={"👥"} rawValueMax={1000}/>
            <span style={{marginLeft: "auto"}}><b>@{connectedStream}</b></span>

          </Typography>
          <Box style={{marginLeft: "auto"}}>
              <Button
                  variant="contained"
                  color="warning"
                  className="disconnect-button"
                  onClick={() => disconnect()}
                >
                  Disconnect
            </Button>
        </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{ width: 240 }}
      >
        <List>
            {menuItemTitles.map((menu: {displayName: string, hashLocation: string}, idx: number) => {
                let menuDisplayTitle = (menu.displayName)
                let className = ""
                if (menuDisplayTitle == title){
                    className = "highlighted"
                    menuDisplayTitle = "🟢" + menuDisplayTitle
                }
                return  (
                    <ListItem onClick={() => navigate(menu.hashLocation) } key={idx} button>
                        <ListItemText primary={menuDisplayTitle} />
                    </ListItem>
                )
            })}

        </List>
      </Drawer>

      <Box className="dashboard-container">
        <Typography variant="h6" component="div">
            {children}
          </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
