import React, {useState} from 'react';
import { Tab, Tabs, Box } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';

import Visualize from '../pages/Visualize';
import HeatmapView from '../pages/HeatmapView';

import VisualizeNumerical from '../pages/VisualizeNumerical';



const VisualizeTabsComponent= () => {

   
    // const tabNameToIndex = {
    //      0: "Categorical",
    //      1: "Numerical",
    //  };
    //  const indexToTabName = {
    //      "Categorical": 0,
    //      "Numerical": 1,
    //  };


    //console.log(page);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        };

// const navigateTo = pathname => {
// 		//history.push(pathname)
// 		handleChange(indexToTabName[pathname])
// 	}

   // const selectRoutes = ['/Categorical', '/Numerical'];
    return (

        <>

            <CssBaseline />


            

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={selectedTab} onChange={handleChange} centered>

                    <Tab label="Categorical" 
                    	
                    />
                    <Tab label="Numerical" 
                        //onClick={() => navigateTo('/WithDP')}
                    />
                    <Tab label="Correlation" 
                    	
                        />
                </Tabs>

            </Box>

            
           {selectedTab === 0 && <Visualize />}

        {selectedTab === 1 && < VisualizeNumerical/> }   

        {selectedTab === 2 && <HeatmapView />}

        

       </>

    );

}

export default VisualizeTabsComponent;