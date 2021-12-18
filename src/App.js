import React from 'react';
import './App.css';
import ModelViewer from "./components/ModelViewer";
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
import Typography from '@mui/material/Typography';

function App() {

  return (
    // <React.Fragment>
    //   <Routes>
    //     <Route path="/" element={<ModelViewer/>}></Route>
    //     <Route path="/bulgari_watch" element={<BulgariWatch/>}></Route>
    //     <Route path="/bulgari_bracelet" element={<BulgariBracelet/>}></Route>
    //     <Route path="/bulgari_ring" element={<BulgariRing/>}></Route>
    //     <Route path="/lv_earring" element={<LVEarrings/>}></Route>
    //     <Route path="/lv_viper_necklace" element={<LVViperNecklace/>}></Route>
    //     <Route path="/lv_necklace" element={<LVNecklace/>}></Route>
    //   </Routes>
      
    // </React.Fragment>
      <Grid container direction="column">
      <Grid item>
        <Header/>
      </Grid>
      <Grid item container>
        <Grid item xs={1} sm={1} lg={2}></Grid>
        <Grid item xs={10} sm={10} lg={8}>
          <Content/>
        </Grid>
        <Grid item xs={1} sm={1} lg={2}></Grid>
      </Grid>
    </Grid>
    
  );
}

export default App;
