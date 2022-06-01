import React, {useState} from 'react';
import { Tab, Tabs, Box, AppBar } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';

import {Link} from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import WithDP from '../pages/WithDP'

import Prediction from '../pages/Prediction';


// import {
//     useLocation,
//     useNavigate,
//     useParams
//   } from "react-router-dom";
  
//   function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//       let location = useLocation();
//       let navigate = useNavigate();
//       let params = useParams();
//       return (
//         <Component
//           {...props}
//           router={{ location, navigate, params }}
//         />
//       );
//     }
  
//     return ComponentWithRouterProp;
//   }

const TabsComponent= () => {


    //  const {match} = props;
    //  const {params} = match;
    // // const {page} = params;
    
    const tabNameToIndex = {
         0: "WithoutDP",
         1: "WithDP",
     };
     const indexToTabName = {
         "WithoutDP": 0,
         "WithDP": 1,
     };


    //console.log(page);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        };

// const navigateTo = pathname => {
// 		//history.push(pathname)
// 		handleChange(indexToTabName[pathname])
// 	}

    const selectRoutes = ['/WithoutDP', '/WithDP'];
    return (

        <>

            <CssBaseline />


            

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={selectedTab} onChange={handleChange} centered>

                    <Tab label="Without Differential Privacy" 
                    	
                    />
                    <Tab label="Differential Privacy" 
                        //onClick={() => navigateTo('/WithDP')}
                    />

                </Tabs>

            </Box>

            
           {selectedTab == 0 && <Prediction />}

        {selectedTab == 1 && <WithDP /> }   


        

       </>

    );

}

export default TabsComponent;