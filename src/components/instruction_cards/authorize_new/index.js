import React from 'react';
import { connect } from "react-redux";

const authorize_new = (props) => {
    const authorizeNew = () => {
        props.toggleLoadData(true);
        sessionStorage.setItem("spotifyMigrateUserData", JSON.stringify(props.userData));

        // TODO: For user selecting what data they would like to migrate via checkboxes,
        //       send to back via params
        window.location = "http://localhost:3500/login/new";
    }
    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>4. AUTHORIZE</h3>
                <hr />
                <p>
                    Authorize access to your newly created account so that the data collected below
                    can be migrated to it.
                </p>
                {/* <button className="btn btn-outline-success" onClick={() => authorizeNew()}>GET DATA</button> */}

                {props.authLoadData ?
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> :
                    props.newAuth ?
                      <div>
                        <div className="success-div">
                          <i className="far fa-check-circle"></i>
                          <h5>Success!</h5>
                        </div>
                        {/* <p>Review the results below before continuing.</p> */}
                      </div> :               
                      <button className="btn btn-outline-success" onClick={() => authorizeNew()}>AUTHORIZE</button>
                }
            </div>
            {/* TODO: This button group should just be its own */}
            <div className="btn-div">
                <button className="btn btn-outline-danger" onClick={props.previousCard}>back</button>
                <button className="btn btn-success under-card-btn" onClick={props.nextCard} disabled={!props.newAuth}>next</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      toggleLoadData: (bool) => dispatch({ type: "TOGGLE_LOAD", bool: bool }),
    //   setUserData: (data) => dispatch({ type: "SET_USER_DATA", userData: data }),
      nextCard: () => dispatch({ type: "NEXT_CARD" }),
      previousCard: () => dispatch({ type: "PREV_CARD" })
    };
  }
  const mapStateToProps = state => {
    return {
      userData: state.userData,
      authLoadData: state.authLoadData,
      dataAdded: state.dataAdded,
      newAuth: state.newAuth
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(authorize_new);
