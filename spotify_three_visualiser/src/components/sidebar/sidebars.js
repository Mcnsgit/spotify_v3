import Searchbar from "../header/searchcontainer/SearchBar"
import SideMenu from "./SideMenu"
    
    export const Sidebars=({
    Left: leftbar,
    Right:    rightbar,

}) => {
    return (
        <div>
            <div>
            {leftbar 
            ? <Searchbar />
            : <SideMenu /> }                                                                                                                                                                                                        
            </div>
            <div>
            {rightbar}
            </div>
        </div>
    )
}