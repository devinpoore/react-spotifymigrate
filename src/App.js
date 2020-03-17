import React from 'react';
import { connect } from "react-redux";
import queryString from "query-string";
import sizeof from "object-sizeof";

import api from "../src/api/api.js";

import WelcomeCard from "../src/components/instruction_cards/welcome";
import NoteCard from "../src/components/instruction_cards/note";
import NewAccountCard from "../src/components/instruction_cards/new_account";
import AuthorizeExistingCard from "../src/components/instruction_cards/authorize_existing";
import SignOutCard from "../src/components/instruction_cards/sign_out";
import AuthorizeNewCard from "../src/components/instruction_cards/authorize_new";
import ReviewCard from "../src/components/instruction_cards/review";
import SuccessCard from "../src/components/instruction_cards/success";

// should probably have an error card too

import WarningCard from "../src/components/warning_card";

import ResultsCard from "../src/components/results_card/main_body";

import './App.css';

class App extends React.Component {

  async componentDidMount() {
    const { auth, access_token } = queryString.parse(window.location.search);
    // console.log(auth, access_token);
    if (access_token) {

      this.props.toggleLoadData(true);

      (auth === "existing") ?
        this.props.setStep(3) :
        this.props.setStep(6);

      const setUserDataNewAcct = async () => {
        await this.props.setUserData(JSON.parse(sessionStorage.getItem("spotifyMigrateUserData")));
        await api.getNewUserData(access_token).then(data => this.props.setNewUserData(data.data));
        // this.props.toggleLoadData(false);
      }
      
      (auth === "existing") ?
        await api.getMigrationData(access_token).then(data => {
          console.log(sizeof(data.data));
          this.props.setUserData(data.data);
        }) :
        await setUserDataNewAcct();
        // await this.props.setUserData(JSON.parse(sessionStorage.getItem("spotifyMigrateUserData")));

      if (auth === "new") {
        this.props.setNewAuth();
      }

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
      return <ReviewCard />
    } else if (cardIndex === 7) {
      return <SuccessCard />
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="row">
              <div className="col-md-6">
                <h1>Spotify Migrate</h1>
              </div>
              <div className="col-md-6">
                <div className="repo-btn-div">
                  <a href="https://github.com/devinpoore/react-spotifymigrate" target="_blank" rel="noreferrer noopener">
                    <button title="Frontend Github Repo" className="btn btn-lg btn-outline-success">
                      <i className="fab fa-react"></i>
                      <i className="fab fa-github"></i>
                    </button>
                  </a>
                  <a href="https://github.com/devinpoore/SpotifyMigrate" target="_blank" rel="noreferrer noopener">
                    <button title="Backend Github Repo" className="btn btn-lg btn-outline-success">
                      <i className="fab fa-node-js"></i>
                      <i className="fab fa-github"></i>
                    </button>
                  </a>
                </div>
              </div>
          </div>

          <hr className="green-rule no-top-margin"/>

          <div className="row ">
            {this.determineInstructionCard()}
            <WarningCard />
          </div>

          <div className="row">
            <ResultsCard />
          </div>

          <hr className="green-rule"/>
          
          <footer>
            <p id="code-poet-sig">
              Designed, developed, and maintained with
              <span role="img" aria-label="heart emoji"> 💗</span> by
              <a id="port-link" href="https://www.devinpoore.tech" target="_blank" rel="noopener noreferrer"> Code Poet Studios</a>
            </p>            
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
    setNewUserData: (data) => dispatch({ type: "NEW_USER", newUserData: data }),
    nextCard: () => dispatch({ type: "NEXT_CARD" }),
    previousCard: () => dispatch({ type: "PREV_CARD" }),
    setStep: (step) => dispatch({ type: "SET_STEP", step }),
    setDataAdded: () => dispatch({ type: "DATA_SET" }),
    setNewAuth: () => dispatch({ type: "NEW_AUTH" })
  };
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    newUserData: state.newUserData,
    authLoadData: state.authLoadData,
    step: state.step,
    dataAdded: state.dataAdded
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
