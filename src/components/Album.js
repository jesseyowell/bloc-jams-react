import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {

	constructor(props) {
		super(props);

		const album = albumData.find( album => {
			return album.slug === this.props.match.params.slug 
		});

		this.state = {
			album: album,
			currentSong: album.songs[0],
			isPlaying: false,
			isMouseOver: false,
		};

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

	play() {
		this.audioElement.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({ isPlaying: false });
	}

	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song });
	}

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;

		if(this.state.isPlaying && isSameSong) {
			this.pause();
		} else {
			if(!isSameSong) { this.setSong(song) }
			this.play();
		}
	}

	mouseEnter() {
		this.setState({ isMouseOver: true });
	}

	mouseLeave() {
		this.setState({ isMouseOver: false });
	}

	renderButton(song, index) {
		
		// check to see if the player isPlaying and if the currentSong is the song we're looking at
		if (this.state.currentSong === song && this.state.isPlaying) {
			// if it is, let's show a pause button
			return <span className="icon ion-md-pause"></span>
		} 
			// if not, is the song being hovered over?
		else if (this.state.isMouseOver && this.state.currentSong === song) {
			// if so, let's display the play button
			return <span className="icon ion-md-play"></span>
		}
		// if song isn't being played or hovered over, let's display the track number
		else { 
			return (index + 1 + ".")
		}
	}

	render() {

		return(
			<section className="album">
				<section id="album-info">
				  <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
				    <div className="album-details">
					  <h1 id="album-title">{this.state.album.title}</h1>
					  <h2 className="artist">{this.state.album.artist}</h2>
				   <div id="release-info">{this.state.album.releaseInfo}</div>
				   </div>
			    </section>
		   		<table id="song-list">
		   			<colgroup>
		   				<col id="song-number-column" />
		   				<col id="song-title-column" />
		   				<col id="song-duration-column" />
		   			</colgroup>
		   			<tbody>
		   			{
		   				this.state.album.songs.map( (song,index) => {
		   					return(
		   					<tr className="song" key={index} onClick={ () => this.handleSongClick(song) } >
		   						<td onMouseEnter={ () => this.mouseEnter(song) } onMouseLeave={ () => this.mouseLeave() }>
		   						{ this.renderButton(song,index) }</td>
		   						<td>{this.state.album.songs[index].title}</td> 
		   						<td>{this.state.album.songs[index].duration} seconds</td>
		   					</tr>	

		   					);
		   				})
		   			} 
		   			</tbody>
		   		</table>
		   	</section>		
	);	
  }
}

export default Album;