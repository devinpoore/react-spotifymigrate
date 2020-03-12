import React from 'react';
import { connect } from "react-redux";

const new_account = (props) => {
    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>1. MAKE A NEW ACCOUNT</h3>
                <hr />
                <p>
                    If you haven't already, <a href="https://www.spotify.com/us/signup/" target="_blank" rel="noopener noreferrer">sign up</a> for
                    a new Spotify account. This is where we will be migrating your current account's data to.
                </p>
                <p>
                    After creating your new account, be sure to <strong>log out</strong> as you'll need to log in to your existing account
                    for the next step.
                </p>
                <p>
                    Keep your new credentials handy as you'll be needing them later on!
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
      nextCard: () => dispatch({ type: "NEXT_CARD" }),
      previousCard: () => dispatch({ type: "PREV_CARD" })
    };
  }

export default connect(null, mapDispatchToProps)(new_account);
