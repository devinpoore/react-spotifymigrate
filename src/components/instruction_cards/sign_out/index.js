import React from 'react';
import { connect } from "react-redux";

const new_account = (props) => {
    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>3. SIGN OUT OF CURRENT ACCOUNT</h3>
                <hr />
                <p>
                    Navigate back to <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer">Spotify</a> and
                    <strong> sign out</strong> of your current account. You should still be signed in after
                    authorizing access in the previous step.
                </p>
                <p>
                    This is the part where using an incognito window pays off.
                </p>
            </div>
            <div className="btn-div">
                <button className="btn btn-outline-danger" onClick={props.previousCard}>back</button>
                <button className="btn btn-success under-card-btn" onClick={props.nextCard}>next</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
    //   toggleLoadData: (bool) => dispatch({ type: "TOGGLE_LOAD", bool: bool }),
    //   setUserData: (data) => dispatch({ type: "SET_USER_DATA", userData: data }),
      nextCard: () => dispatch({ type: "NEXT_CARD" }),
      previousCard: () => dispatch({ type: "PREV_CARD" })
    };
  }

export default connect(null, mapDispatchToProps)(new_account);
