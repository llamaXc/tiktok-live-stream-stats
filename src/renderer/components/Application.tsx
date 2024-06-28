/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import './Application.scss';
import LaunchScreen from '../pages/LaunchScreen/LaunchScreen'
import Dashboard from '../pages/Dashboard/Dashboard'
import { HashRouter, Routes, Route } from "react-router-dom";
import setupICPListeners from '../utils/ipcListeners'
import { ThemeProvider } from '@mui/material/styles';
import theme from "../themes/retro"
import StatsDashboardView from '@renderer/pages/WindowViews/MainDashboard/StatsDashboardView';
import { VRDashboard } from '@renderer/pages/WindowViews/VRDashboard/VRDashboard';

const Application: React.FC = () => {

  useEffect(() => {
    setupICPListeners()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes >
            <Route path="/" element={<LaunchScreen/>} />
            <Route path="/dashboard" element={<Dashboard title="Dashboard" ><StatsDashboardView/></Dashboard>}/>
            <Route path="/dashboard-vr" element={<Dashboard title="VR"><VRDashboard/></Dashboard>}/>
            <Route path="/dashboard-scoreboard"  element={<Dashboard title="Scoreboard"><h1>Scoreboard</h1></Dashboard>}/>
            <Route path="/*" element={<p>No page found</p>}/>
        </Routes >
      </HashRouter>
    </ThemeProvider>
  );
};

export default Application;
