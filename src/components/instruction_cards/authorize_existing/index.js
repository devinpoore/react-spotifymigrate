import React from 'react';
import { connect } from "react-redux";

const authorize_existing = (props) => {
    const authorizeExisting = () => {
        props.toggleLoadData(true);    
        // TODO: For user selecting what data they would like to migrate via checkboxes,
        //       send to back via params
        window.location = "http://localhost:3500/login/existing";
    }
    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>2. AUTHORIZE</h3>
                <hr />
                <p>
                  Authorize access to your <strong>current account </strong>
                  - the one you would like to migrate data <i>from</i> - so that the
                  appropriate data can be retrieved.
                </p>
                <p>
                  Once again, it is recommended that you open this website in an incognito 
                  window <i>before</i> retrieving your data.
                </p>
                {props.authLoadData ?
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> :
                    props.dataAdded ?
                      <div>
                        <div className="success-div">
                          <i className="far fa-check-circle"></i>
                          <h5>Success!</h5>
                        </div>
                        <p>Review the results below before continuing.</p>
                      </div> :
                    // put a 'Restart' button somewhere when userData exists
                      <button className="btn btn-outline-success" onClick={() => authorizeExisting()}>GET DATA</button>
                }
            </div>
            {/* TODO: This button group should just be its own */}
            <div className="btn-div">
                <button className="btn btn-outline-danger" onClick={props.previousCard}>back</button>
                <button className="btn btn-success under-card-btn" onClick={props.nextCard} disabled={!props.dataAdded}>next</button>
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
      dataAdded: state.dataAdded
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(authorize_existing);
