import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData'
import './Sidebar.css'
import {IconContext} from 'react-icons'
import { Box } from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip"
function Sidebar() {
    const [sidebar, setSidebar] = useState(true)

    const showSidebar = () => setSidebar(!sidebar)
    return(
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className = "sidebar">
                <Link to="#" className='menu-fbars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                <Tooltip
                    title="Upload dataset"
                    placement="top"
                                >
                <Link to="/login" className='topnav'>
                    Data contributors
                </Link>
                </Tooltip>
                <Tooltip
                    title="Access datasets"
                    placement="top"
                                >
                <Link to="/loginR" className='researcher'>
                    Researchers
                </Link>
                </Tooltip>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle' onClick={showSidebar}>
                        <Link to = "#" className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    <br></br>
                    <br></br>
                    {SidebarData.map((item, index) => {
                        return(
                            <Tooltip
                                 title={item.tooltiptext}
                                placement="top"
                                >
                            <li key={index} className={item.cName}>

                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}   
                                    </span>
                                </Link>
                            </li>
                            </Tooltip>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar