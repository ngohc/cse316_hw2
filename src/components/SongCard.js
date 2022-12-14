import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songMarkedForRemoval: this.getRemoveSongIndex(),
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    handldeSongRemoval = (event) => {
        let songIndex = Number.parseInt(event.target.id.split("-")[2]);

        let songIdKeyPair = {
            id : songIndex - 1,
            song : this.props.song
        }
        this.props.markRemoveSongCallback(songIdKeyPair);
    }
    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }
    getRemoveSongIndex = () => {
        return this.songToRemoveIndex;
    }
    // give the id of song to remove
    setRemoveSongIndex(initIndex) {
        this.songToRemoveIndex = initIndex;
    }
    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        let youtubeLink = "https://www.youtube.com/watch?v=" + song.youTubeId;
        console.log("num: " + num);
        let itemClass = "unselected-list-card";
        if (this.state.draggedTo) {
            itemClass = "playlister-song-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
            >
                {num}.{" "}
                <a href={youtubeLink}>{song.title} by {song.artist}</a>
                <input
                    type="button"
                    id={"delete-song-" + num}
                    className="list-card-button"
                    onClick={this.handldeSongRemoval}
                    value={"X"} 
                />
            </div>
            
        )
    }
}

