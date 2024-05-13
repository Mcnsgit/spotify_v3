
import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal } from "../../utils/actions/uiActions"; 
import SideMenu from "./SideMenu";
import NewPlaylist from "./components/newPlaylis";
import "./leftSection.scss";
class LeftSection extends Component {
    render() {
        return (
            <div className="left-section">
            <SideMenu />
            <div className="buttom-section">
              <NewPlaylist setModal={this.props.setModal} />
            </div>
          </div>
        );
      }
    }

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
          {
            setModal
          },
          dispatch
        );
      };
      
      export default connect(
        null,
        mapDispatchToProps
      )(LeftSection);