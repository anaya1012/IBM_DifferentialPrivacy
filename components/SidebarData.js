
   
import React from 'react'
import * as BsIcons from "react-icons/bs"
import * as FaIcons from "react-icons/fa"

export const SidebarData = [
    {
        title: 'About Differential Privacy',
        path: '/',
        icon: <BsIcons.BsInfoCircleFill />,
        cName: 'nav-text'
    },
   
    {
        title: 'Visualize Dataset',
        path: '/visualize',
        icon: <FaIcons.FaDatabase />,
        cName: 'nav-text'

    },

    
    {
        title: 'Predict Disease',
        path: '/predictResults',
        icon: <FaIcons.FaHeartbeat />,
        cName: 'nav-text'

    },

    {
        title: 'Visualize Results',
        path: '/prediction',
        icon: <FaIcons.FaHeartbeat />,
        cName: 'nav-text'

    },
]