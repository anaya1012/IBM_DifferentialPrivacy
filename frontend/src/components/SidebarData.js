import React from 'react'
import * as BsIcons from "react-icons/bs"
import * as FaIcons from "react-icons/fa"

export const SidebarData = [
    {
        title: 'About Differential Privacy',
        path: '/',
        icon: <BsIcons.BsInfoCircleFill />,
        cName: 'nav-text',
        tooltiptext: ' This page gives general information about differential privacy and its components'
    },
   
    {
        title: 'Visualize Dataset',
        path: '/visualize',
        icon: <FaIcons.FaDatabase />,
        cName: 'nav-text',
        tooltiptext: ' Click here to visualize dataset'
    },

    
    {
        title: 'Predict Disease',
        path: '/predictResults',
        icon: <FaIcons.FaHeartbeat />,
        cName: 'nav-text',
        tooltiptext: ' Click here for disease prediction'


    },

    {
        title: 'Visualize Results',
        path: '/prediction',
        icon: <FaIcons.FaHeartbeat />,
        cName: 'nav-text',
        tooltiptext: ' Click here to visualize predicted results'

    },
]