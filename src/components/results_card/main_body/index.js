import React from 'react';
import { connect } from "react-redux";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const results_card = (props) => {
    return (
        <div className="col-md-12">

            <div className="results-card">

                {props.authLoadData ?
                    <h3>Retrieving account data...</h3> :
                    props.userData.user.display_name ?
                        <h3>Results for <span id="green-name">{props.userData.user.display_name ? props.userData.user.display_name.split(" ")[0] : ""}</span>:</h3> :
                        <h3>Results:</h3>
                }

                <Tabs>

                    <TabList>
                        <Tab>Saved Songs</Tab>
                        <Tab>Saved Albums</Tab>
                        <Tab>Followed Artists</Tab>
                        <Tab>Playlists</Tab>
                    </TabList>

                    {props.userData.savedTracks ?
                        <div>
                            <TabPanel>
                                <div className="tracks">
                                    {props.userData.savedTracks.map(trackData => {
                                        return (
                                            <div className="track-card">
                                                <h6>"{trackData.name}"</h6>
                                                <p>{trackData.artist}</p>
                                                <p><i>{trackData.album}</i></p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="albums">
                                    {props.userData.savedAlbums.map(albumData => {
                                        return (
                                            <div className="album-card" style={{ backgroundImage: albumData.coverURL ? `url(${albumData.coverURL})` : "none" }}>
                                                <div className="album-card-overlay">
                                                    <h6><i>{albumData.name}</i></h6>
                                                    <p>{albumData.artist}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="artists">
                                    {props.userData.following.map(artistData => {
                                        return (
                                            <div>
                                                <div className="artist-card" style={{ backgroundImage: artistData.pictureURL ? `url(${artistData.pictureURL})` : "none" }}></div>
                                                <h6>{artistData.name}</h6>
                                            </div>
                                        )
                                    })}

                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="playlists">
                                    {props.userData.playlists.map(playlistData => {
                                        return (
                                            <div className="playlist-card" style={{ backgroundImage: playlistData.coverURL ? `url(${playlistData.coverURL})` : "none" }}>
                                                <div className="playlist-text">
                                                    <h6>{playlistData.name}</h6>
                                                    <p>{playlistData.description ? playlistData.description : ""}</p>
                                                    <p>{playlistData.tracksInfo.total} {playlistData.tracksInfo.total === 1 ? "track" : "tracks"}</p>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </TabPanel>
                        </div> :
                        <div></div>
                    }

                </Tabs>
            </div>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLoadData: (bool) => dispatch({ type: "TOGGLE_LOAD", bool: bool }),
        setUserData: (data) => dispatch({ type: "SET_USER_DATA", userData: data }),
        nextCard: () => dispatch({ type: "NEXT_CARD" }),
        previousCard: () => dispatch({ type: "PREV_CARD" })
    };
}
const mapStateToProps = state => {
    return {
        userData: state.userData,
        authLoadData: state.authLoadData,
        step: state.step
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(results_card);
