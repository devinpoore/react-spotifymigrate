import React from 'react';

const warning_card = () => {
    return (
        <div className="col-md-7 warning-div">
            <div className="warning-card">
                <h3>WHAT DATA WILL NOT BE MIGRATED</h3>
                <hr />
                <p>At this time, we don't have the ability to migrate the following:</p>
                <ul>
                    <li>
                        Your historic listening data:
                    <ul className="sublist">
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
                    <li>Accounts that you follow that are non-artist accounts</li>
                    <li>Your followed podcasts and listening history</li>
                    <li>There is no way to notify any followers of your current account to follow your new account</li>
                </ul>
            </div>
        </div>
    )
}

export default warning_card;
