import React from 'react';
import { connect } from "react-redux";
import queryString from "query-string";

import api from "../src/api/api.js";

import WelcomeCard from "../src/components/instruction_cards/welcome";
import NoteCard from "../src/components/instruction_cards/note";
import NewAccountCard from "../src/components/instruction_cards/new_account";
import AuthorizeExistingCard from "../src/components/instruction_cards/authorize_existing";
// import ReviewCard from "../src/components/instruction_cards/review";
import SignOutCard from "../src/components/instruction_cards/sign_out";
import AuthorizeNewCard from "../src/components/instruction_cards/authorize_new";
import SuccessCard from "../src/components/instruction_cards/success";

// should probably have an error card too

import WarningCard from "../src/components/warning_card";

import ResultsCard from "../src/components/results_card/main_body";

import './App.css';

class App extends React.Component {

  async componentDidMount() {
    if (queryString.parse(window.location.search).access_token) {
      this.props.toggleLoadData(true);
      this.props.setStep(3);
      
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token;
      
      await api.getMigrationData(accessToken).then(data => this.props.setUserData(data.data));
      this.props.setDataAdded();
      this.props.toggleLoadData(false);
    }
  }

  determineInstructionCard = () => {
    const cardIndex = this.props.step;
    if (cardIndex === 0) {
      return <WelcomeCard />
    } else if (cardIndex === 1) {
      return <NoteCard />
    } else if (cardIndex === 2) {
      return <NewAccountCard />
    } else if (cardIndex === 3) {
      return <AuthorizeExistingCard />
    } else if (cardIndex === 4) {
      return <SignOutCard />
    } else if (cardIndex === 5) {
      return <AuthorizeNewCard />
    } else if (cardIndex === 6) {
      return <SuccessCard />
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="row">
              <h1>Spotify Migrate</h1>
          </div>

          <hr className="green-rule"/>

          <div className="row ">
            {this.determineInstructionCard()}
            <WarningCard />
          </div>

          <div className="row">
            <ResultsCard />
          </div>

          <hr className="green-rule"/>
          
          <footer>
            <p id="code-poet-sig">Designed, developed, and maintained with <span role="img" aria-label="heart emoji">💗</span> by Code Poet Studios</p>            
          </footer>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLoadData: (bool) => dispatch({ type: "TOGGLE_LOAD", bool: bool }),
    setUserData: (data) => dispatch({ type: "SET_USER_DATA", userData: data }),
    nextCard: () => dispatch({ type: "NEXT_CARD" }),
    previousCard: () => dispatch({ type: "PREV_CARD" }),
    setStep: (step) => dispatch({ type: "SET_STEP", step }),
    setDataAdded: () => dispatch({ type: "DATA_SET" })
  };
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    authLoadData: state.authLoadData,
    step: state.step,
    dataAdded: state.dataAdded
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
