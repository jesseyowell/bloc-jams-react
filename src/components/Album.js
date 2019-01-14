import React, { Component } from 'react';
import PlayerBar from './PlayerBar';
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
			currentTime: 0,
			currentVolume: 0.80,
			duration: album.songs[0].duration,
			isPlaying: false,
			isMouseOver: null
		};

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

	componentDidMount() {
		this.eventListeners = {
			timeupdate: e => {
				this.setState({ currentTime: this.audioElement.currentTime });
			},
			durationchange: e => {
				this.setState({ durationchange: this.audioElement.duration });
			},
			volumechange: e => {
				this.setState({ volumechange: this.audioElement.volumechange });
			}
		};
		this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
	}

	componentWillUnmount() {
		this.audioElement.src = null;
		this.audioElement.removeEventListener('timeupdate',this.eventListeners.timeupdate);
		this.audioElement.removeEventListener('durationchange',this.eventListeners.durationchange);
		this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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

	handlePrevClick(song) {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.max(0, currentIndex - 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleNextClick(song) {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleTimeChange(e) {
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({ currentTime: newTime });
	}

	handleVolumeChange(e) {
		const newVolume = e.target.value;
		this.audioElement.volume = newVolume;
		this.setState({ currentVolume: newVolume });
	}

	formatTime(seconds) {

		const minuteField = Math.floor(seconds / 60);
		const secondField = Math.floor(seconds - (minuteField * 60));
			
		if (isNaN(seconds) || seconds === undefined) {
			return `-:--`;
		}

		else if(secondField < 10) {
			return `${minuteField}:0${secondField}`;
        }

        else if (secondField % 60 === 0) {
        	return `${minuteField}:00`;
        }
		
		else {
			return `${minuteField}:${secondField}`;	
		}		
	}

	mouseHover(song) {
		this.setState({ isMouseOver: song });
	}

	mouseLeave() {
		this.setState({ isMouseOver: null });
	}

	renderButton(song, index) {
		
		// check to see if the player isPlaying and if the currentSong is the song we're looking at
		if (this.state.currentSong === song && this.state.isPlaying) {
			// if it is, let's show a pause button
			return <span className="icon ion-md-pause"></span>
		} 
			// if not, is the song being hovered over?
		else if (this.state.isMouseOver === song) {
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
		   						<td onMouseEnter={ () => this.mouseHover(song) } onMouseLeave={ () => this.mouseLeave() }>
		   						{ this.renderButton(song,index) }</td>
		   						<td>{this.state.album.songs[index].title}</td> 
		   						<td>{this.formatTime(this.state.album.songs[index].duration)}</td>
		   					</tr>	

		   					);
		   				})
		   			} 
		   			</tbody>
		   		</table>
		   		<PlayerBar 
		   			isPlaying={this.state.isPlaying} 
		   			currentSong={this.state.currentSong}
		   			currentTime={this.audioElement.currentTime}
		   			duration={this.audioElement.duration}
		   			handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
		   			handlePrevClick={ () => this.handlePrevClick() }
		   			handleNextClick={ () => this.handleNextClick() } 
		   			handleTimeChange={ (e) => this.handleTimeChange(e) }
		   			handleVolumeChange={ (e) => this.handleVolumeChange(e) }
		   			formatTime={ (seconds) => this.formatTime(seconds) } 
		   		/>
		   	</section>		
	);	
  }
}

export default Album;