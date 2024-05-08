import Searchbar from "../header/searchcontainer/SearchBar"
import SideMenu from "./SideMenu"
import "./Sidebar.module.css"
    
    export const  Sidebars = () => {
        return (
                        <div className=""> 
                        <Searchbar />
                        <SideMenu />                   
        </div>
    )
}
