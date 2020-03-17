import React from 'react';
import { connect } from "react-redux";
import queryString from "query-string";

import api from "../../../api/api.js";

const review = (props) => {
    const migrateData = () => {
        // migrate data to backend
        api.migrate(
            queryString.parse(window.location.search).access_token,
            props.newUserData.id,
            props.userData
        ).then(res => {
            // update ui state to confirm data migration
            console.log(res.data);
        });
    }

    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>5. REVIEW &amp; MIGRATE</h3>
                <hr />
                <p>
                    You're all set!
                </p>
                {/* Check to make sure that the access token for the current account is DIFFERENT than the stored user data */}
                <p>
                    Data has been retrieved from your existing account and is ready to be migrated
                    to the new account you just provided authorization for.
                </p>
                <p>
                    As long as everything still looks go, go ahead and proceed.
                </p>

                <hr />


                <div className="migration-card">
                    <h5>Migrate</h5>
                    <div className="account-info-card">
                        <p>- {props.userData.savedTracks.length} Songs</p>
                        <p>- {props.userData.savedAlbums.length} Albums</p>
                        <p>- {props.userData.following.length} Artists</p>
                        <p>- {props.userData.playlists.length} Playlists</p>
                    </div>
                </div>


                <div className="migration-card">
                    <h5>from:</h5>
                    <div className="account-info-card blue">
                        <p>{props.userData.user.display_name}</p>
                        <p>Account #{props.userData.user.id}</p>
                        <p>{props.userData.user.email}</p>
                    </div>
                </div>


                <div className="migration-card">
                    <h5>to:</h5>
                    <div className="account-info-card blue">
                        {props.authLoadData ?
                            <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> :
                            props.newUserData ?
                            <div>
                                <p>{props.newUserData.display_name}</p>
                                <p>Account #{props.newUserData.id}</p>
                                <p>{props.newUserData.email}</p>
                            </div> :
                            <div></div>
                        }
                    </div>
                </div>

                <button className="btn btn-outline-success" onClick={() => migrateData()}>MIGRATE</button>
            </div>
            {/* TODO: This button group should just be its own */}
            <div className="btn-div">
                <button className="btn btn-outline-danger" onClick={props.previousCard}>back</button>
                {props.migrationComplete ?
                    <button className="btn btn-success under-card-btn" onClick={props.nextCard}>next</button> :
                    <div></div>                
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      toggleLoadData: (bool) => dispatch({ type: "TOGGLE_LOAD", bool: bool }),
      nextCard: () => dispatch({ type: "NEXT_CARD" }),
      previousCard: () => dispatch({ type: "PREV_CARD" })
    };
  }
  const mapStateToProps = state => {
    return {
      userData: state.userData,
      newUserData: state.newUserData,
      authLoadData: state.authLoadData,
      dataAdded: state.dataAdded
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(review);
