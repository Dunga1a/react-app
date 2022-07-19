import { useState } from "react";
import App from "./App";
import { IconContext } from  './react-icons';
import { IoMdHome ,IoIosFlag} from './react-icons/io';

import './assest/grid.css';
import './Home.css';



function HomeCountry() {

    const[toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
      };

    return (


        <>
            < IconContext.Provider value={{className:'icon-home'}} >
                <div className="header">
                    <div id = "header-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="menu">
                    <div className="row">
                        <div className="col l-12">
                            <div className="row">
                                <div className="col l-2">
                                    <ul className="menu-list ">
                                        <li className={toggleState === 1 ? "menu-list_item active-item" : "menu-list_item"}
                                        onClick={() => toggleTab(1)}>
                                            <IoMdHome/>
                                            Home</li>
                                        <li className={toggleState === 2 ? "menu-list_item active-item" : "menu-list_item"}
                                        onClick={() => toggleTab(2)}>
                                            <IoIosFlag/>
                                            Countries</li>
                                        
                                    </ul>
                                </div>
                                <div className="col l-9">
                                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                        Home
                                    </div>
                                    <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                        <App />
                                    </div> 
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </IconContext.Provider>
        </>

        
    )

}







export default HomeCountry;