import React, { Component } from 'react';
// import SongCard from './components/SongCard.js';

export default class RemoveSongModal extends Component {
    render() {
        const { songIdKeyPair, currentList, removeSongCallback, hideRemoveSongModalCallback } = this.props;
        let name = "";
        if (currentList && songIdKeyPair) {
            let songToRemoveIndex = songIdKeyPair.id;
            name = currentList.songs[songToRemoveIndex].title;
        }

        return (
            <div 
                className="modal" 
                id="remove-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-remove-song-root'>
                        <div className="modal-north">
                            Remove song?
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                                Are you sure you wish to permanently remove <b>{name}</b> from the playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="remove-song-confirm-button" 
                                className="modal-button" 
                                onClick={removeSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="remove-song-cancel-button" 
                                className="modal-button" 
                                onClick={hideRemoveSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
        
    }
}