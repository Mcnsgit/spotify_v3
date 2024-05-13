import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchPlaylistsMenu } from "../../utils/actions/playlistActions";
import './sideMenu.scss';

import withUiActions from "../../hoc/uiHoc";
// import menuButtons from "./MenuButtons"; 
import { Container } from "react-bootstrap";
// import { IoLibrary } from "react-icons/io5";
// import { MdHomeFilled, MdSearch } from "react-icons/md";
// import Playlists from "../sections/playlists/modal";

const sectionOne = [
  {name: 'Browse', view: 'browse', id:1}];

  const sectionTwo = [
    { name: 'Recently Played', view: 'recently', id: 2 },
    { name: 'Songs', view: 'songs', id: 3 },
    { name: 'Albums', view: 'albums', id: 4 },
    { name: 'Artists', view: 'artists', id: 5 }
  ];
  class SideMenu extends Component {
    state = {
      active:"Browse"
    };

    componentDidMount() {
      this.props.fetchPlaylistsMenu();
    }

    setActive = (item, playlist) => {
      this.setState({ active: item.id });
      if (playlist) {
        this.props.onPlaylistClick(item.id);
      } else {
        this.props.setView(item.view || 'browse');
      }
    };
  

    generateItems(items, playlist = false) {
      return items.map(item => (
        <menuButtons
          key={item.id}
          title={item.name}
          active={this.state.active === item.id}
          onClick={() => this.setActive(item, playlist)}
        />
      ));
    }

    render = () => {
      const playlists = this.props.playlists ? this.props.playlists.items : [];
      return (
        <Container>
          <ul className="side-menu-container">
            {this.generateItems(sectionOne)}
            <h3 className="library-header">Your Library</h3>
            {this.generateItems(sectionTwo)}
            <div className="user-playlists">
              <h3 className="library-header">Playlists</h3>
              {this.generateItems(playlists, true)}
            </div>
          </ul>
        </Container>
      );
    };
  }

  const mapStateToProps = (state) => {
    return {
      playlists: state.playlistReducer.playlists || null
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchPlaylistsMenu }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withUiActions(SideMenu));

//   return (
//     <Container>
//       <div className="top_links">
//         <div className="logo">
//           <img
//             src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
//             alt="spotify logo"
//           />
//         </div>
//         <ul>
//           <li>
//             <MdHomeFilled />
//             <span>Home</span>
//           </li>
//           <li>
//             <MdSearch />
//             <span>Search</span>
//           </li>
//           <li>
//             <IoLibrary />
//             <span>Your Library</span>
//           </li>
//         </ul>
//       </div>
//       <Playlists />
//     </Container>
//   );
// }

