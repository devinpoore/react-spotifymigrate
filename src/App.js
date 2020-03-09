import React from 'react';
import queryString from "query-string";

import api from "../src/api/api.js";

import './App.css';

class App extends React.Component {
  state = {
    userData: {},
    authLoadData: false
  }

  async componentDidMount() {
    if (queryString.parse(window.location.search).access_token) {
      this.setState({ authLoadData: true });

      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token;
      
      await api.getMigrationData(accessToken).then(data => this.setState({ userData: { user: data }, authLoadData: false }));
      
      // fetch("https://api.spotify.com/v1/me", {
      //   headers: {"Authorization": "Bearer " + accessToken}
      // }).then(response => response.json()).then(data => this.setState({ userData: { user: data }}));
    }
  }

  authorize = () => {
    this.setState({ authLoadData: true });
    // TODO: For user selecting what data they would like to migrate via checkboxes,
    //       send to back via params
    window.location = "http://localhost:3500/login";
  }

  // getRecentlyPlayed = async () => {
  //   await api.getRecentlyPlayed(accessToken).then(res => {
  //     console.log(res);
  //   });
  // }

  render() {


    return (
      <div className="App">

        <div className="container">

          <div className="row">

            <h1>Welcome to Spotify Migrate</h1>
            {/* <h6>- migrate your playlists, liked songs, saved artists/albums/playlists, recently played & more to a new account</h6> */}

          </div>

          <hr />

          <div className="row ">

            <div className="col-md-6">

              <div className="new-acct-card">
                  <h3>1. MAKE A NEW ACCOUNT</h3>
                  <hr />
                  <p>If you haven't already, <a href="https://www.spotify.com/us/signup/" target="_blank" rel="noopener noreferrer">sign up</a> for a new Spotify account. This is where we will be migrating your current account's data to.</p>
                  <p>After creating your new account, be sure to <strong>log out</strong> as you'll need to log in to your existing account for the next step.</p>
              </div>

            </div>

            <div className="col-md-6">

              <div className="new-acct-card">
                <h3>2. MIGRATE YOUR DATA</h3>
                <hr />
                <p>Authorize access to your current account and specify what you would like to migrate.</p>

                {this.state.authLoadData ?
                  <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div> :
                  // put a 'Restart' button somewhere when userData exists
                  <button className="btn btn-dark" onClick={this.authorize}>Get Started</button>
                }
              </div>

            </div>

          </div>

          <div className="row">

            <div className="col-md-12 warning-div">

              <div className="warning-card">
                <h3>WHAT DATA WILL NOT BE MIGRATED</h3>
                <hr />
                <p>At this time, we don't have the ability to migrate the following:</p>
                <ul>

                  <li>
                    Your historic listening data:
                    <ul>
                      <li>
                        Spotify (presumably) maintains your complete listening history for their proprietary
                        recommendation algorithms; this data is not publicly available via the Spotify API and
                        thus cannot be migrated to and associated with your new account.
                      </li>
                      <li>
                        This will (at least initially until you build up historic data on your new acount) affect
                        Spotify features like Discover Weekly and your Rewind Playlists
                      </li>
                      <li>
                        If you would like to maintain your yearly Top Songs of 20XX collections, be sure to
                        follow/save those playlists before starting the migration progress and they will be
                        moved over with the rest of your playlists
                      </li>
                    </ul>
                  </li>

                  <li>Your recetly played music</li>

                  <li>Your followed podcasts and listening history</li>

                  <li>There is no way to notify any followers of your current account to follow your new account</li>

                </ul>

              </div>

            </div>

          </div>

          {/* <div className="row">

            <div className="col-md-12">

              <div className="results-card">

                <p>Spotify Data for ACCT OWNER NAME</p>

                <p>Playlists</p>
                <p>Saved Songs</p>
                <p>Saved Albums</p>
                <p>Followed Artists</p>
                <p>Followed Users</p>

              </div>

            </div>

          </div> */}

          <div className="row">

            <div className="col-md-12">

              <div className="results-card">
                {this.state.authLoadData ? 
                  <h6>retrieving account data... (insert dynamic download text/data size details/download bar)</h6> :
                  <h6>*this is where the results go</h6>
                }
                <hr />
                <pre>{JSON.stringify(this.state.userData, null, 2)}</pre>
              </div>

            </div>

          </div>

          <hr />
          
          <footer>
            <p id="code-poet-sig">Designed, developed, and maintained with <span role="img" aria-label="heart emoji">💗</span> by Code Poet Studios</p>            
          </footer>

        </div>

      </div>
    );


  }
}

export default App;
