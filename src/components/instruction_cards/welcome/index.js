import React from 'react';
import { connect } from "react-redux";

const welcome = (props) => {
    return (
        <div className="col-md-5">
            <div className="welcome-card">
                <h3>MIGRATE YOUR DATA</h3>
                <hr />
                <p>PLAYLISTS</p>
                <p>-</p>
                <p>SAVED TRACKS</p>
                <p>-</p>
                <p>SAVED ALBUMS</p>
                <p>-</p>
                <p>FOLLOWED ARTISTS</p>
            </div>
            <div className="btn-div">
                <button className="btn btn-outline-success under-card-btn" onClick={props.nextCard}>get started</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      nextCard: () => dispatch({ type: "NEXT_CARD" })
    };
  }

export default connect(null, mapDispatchToProps)(welcome);
