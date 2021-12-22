import React from 'react';
import './App.css';
import BulgariWatch from "./components/BulgariWatch";
import BulgariBracelet from "./components/BulgariBracelet";
import BulgariRing from "./components/BulgariRing";
import LVEarrings from "./components/LVEarrings";
import LVViperNecklace from "./components/LVViperNecklace";
import LVNecklace from "./components/LVNecklace";
import { Routes, Route } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Header from "./components/Header";
import Content from "./components/Content";

function App() {

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container >
      <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <Header/>
        </Grid>
        <Grid item xs={1} sm={1} lg={2}></Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <Routes>
            <Route path="/" element={<Content/>}></Route>
            <Route path="/bulgari_watch" element={<BulgariWatch/>}></Route>
            <Route path="/serpenti_viper_bracelet" element={<BulgariBracelet/>}></Route>
            <Route path="/b_zero1_ring" element={<BulgariRing/>}></Route>
            <Route path="/serpenti_viper_boucles" element={<LVEarrings/>}></Route>
            <Route path="/serpenti_viper_necklace" element={<LVViperNecklace/>}></Route>
            <Route path="/le_magnifiche_creazioni" element={<LVNecklace/>}></Route>
          </Routes>
        </Grid>
        <Grid item xs={1} sm={1} lg={2}></Grid>
      </Grid>
    </Grid>
    
  );
}

export default App;
