import React from 'react';
import { connect } from 'react-redux';

const warning_card = (props) => {
    return (
        <div className="col-md-5">
            <div className="new-acct-card">
                <h3>- NOTE -</h3>
                <hr />
                <p>
                    The following process involves logging in and out of multiple accounts on the same service. I recommend using
                    an incognito window as it should simplify said process by circumventing any unnecessary complications due to saved browser
                    login data.
                </p>
                <p>
                    tldr: Use incognito window for less potential headaches
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

export default connect(null, mapDispatchToProps)(warning_card);
