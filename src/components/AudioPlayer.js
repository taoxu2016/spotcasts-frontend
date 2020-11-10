import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PauseIcon, CloseIcon, PlayIcon } from "./Icons";
import { PlayerContext } from "../context/PlayerContext";
import { secondsToHMS } from "../utils";

const Wrapper = styled.div`
	.progress-bar {
		width: 100%;
		height: 4px;
		margin-top: 1.3rem;
		cursor: pointer;
		background-color: ${props => props.theme.black};
	}

	.progress-filled {
		width: 0;
		height: 4px;
		background-color: ${props => props.theme.yellow};
	}

	.runtime {
		position: relative;
		top: -35px;
		left: 5px;
		font-size: 0.9rem;
		font-family: ${props => props.theme.font2}, sans-serif;
		padding: 0.25rem 0.5rem;
		background-color: ${props => props.theme.black};
		border-radius: 4px;
	}

	.player {
		height: 55px;
		background-color: ${props => props.theme.gray};
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.playback-rate {
		font-family: ${props => props.theme.font2}, sans-serif;
		cursor: pointer;
		min-width: 40px;
	}

	.player svg {
		width: 20px;
		height: 20px;
		fill: ${props => props.theme.primaryColor};
	}

	.player svg:hover {
		cursor: pointer;
	}

	input[type="range"] {
		-webkit-appearance: none;
		height: 6px;
		border-radius: 4px;
		background-color: ${props => props.theme.sliderBg};
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 7px;
		background-color: ${props => props.theme.sliderThumb};
	}
`;

const AudioPlayer = ({ audioUrl, episodeId }) => {
	// context
	const { setPlayer } = useContext(PlayerContext);

	// state
	const [controls, setControls] = useState({
		volume: 0.8,
		playbackRate: 1
	});

	const [showRuntime, setShowRuntime] = useState(false);
	const [playing, setPlaying] = useState(false);

	// refs
	const audioRef = useRef(null);
	const progressRef = useRef(null);

	// methods
	const closePlayer = () => {
		const recentlyPlayed =
			JSON.parse(localStorage.getItem("recentlyPlayed")) || {};

		const updates = {
			...recentlyPlayed,
			[episodeId]: audioRef.current.currentTime
		};

		localStorage.setItem("recentlyPlayed", JSON.stringify(updates));
		setPlayer({ open: false });
	};

	const handlePlayback = () => {
		const audioPlayer = audioRef.current;

		const newPlaybackRate = (controls.playbackRate + 0.25) > 2 ? 0.75 : controls.playbackRate + 0.25;
		setControls(controls => ({...controls, playbackRate: newPlaybackRate}));
		audioPlayer.playbackRate = newPlaybackRate;

	}

	const handleControls = e =>
		setControls(controls => {
			audioRef.current[e.target.name] = e.target.value;
			return { ...controls, [e.target.name]: e.target.value };
		});

	const togglePlay = () => {
		const audioPlayer = audioRef.current;
		audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
		setPlaying(!playing);
	};

	const scrub = e => {
		const audioPlayer = audioRef.current;
		const progress = progressRef.current;

		const time =
			(e.nativeEvent.offsetX / progress.offsetWidth) * audioPlayer.duration;
		audioPlayer.currentTime = time;
	};

	useEffect(() => {
		const audioPlayer = audioRef.current;
		const progress = progressRef.current;

		// event listeners
		audioPlayer.addEventListener("timeupdate", () => {
			const progressFilled = document.querySelector(".progress-filled");
			const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
			progressFilled.style.width = `${percent}%`;
		});

		audioPlayer.addEventListener("ended", () => {
			const recentlyPlayed =
				JSON.parse(localStorage.getItem("recentlyPlayed")) || {};
			const episodeIds = Object.keys(recentlyPlayed);
			const isPresent = episodeIds.find(id => id === episodeId);

			if (isPresent) {
				delete recentlyPlayed[episodeId];
			}

			localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
			setPlayer({ open: false });
		});

		progress.addEventListener("mousemove", e => {
			setShowRuntime(true);

			const runtime = document.querySelector(".runtime");
			const duration =
				(e.offsetX / progress.offsetWidth) * audioPlayer.duration;
			runtime.innerText = secondsToHMS(duration || 0);
			const width = (e.offsetX / progress.offsetWidth) * 100;

			if (width <= 80) {
				runtime.style.left = `${e.offsetX}px`;
			} else {
				runtime.style.left = `${e.offsetX - 70}px`;
			}
		});

		progress.addEventListener("mouseleave", e => setShowRuntime(false));

		audioPlayer.src = audioUrl;
		audioPlayer.load();

		const recentlyPlayed =
			JSON.parse(localStorage.getItem("recentlyPlayed")) || {};
		audioPlayer.currentTime = recentlyPlayed[episodeId] || 0;

		audioPlayer.play();
		setPlaying(true);

		audioPlayer.volume = controls.volume;
	}, [audioUrl]);

	return (
		<Wrapper>
			<div ref={progressRef} className="progress-bar" onClick={scrub}>
				<div className="progress-filled"></div>
				{showRuntime && <span className="runtime"></span>}
			</div>

			<audio ref={audioRef} style={{ display: "none" }} />

			<div className="player">
				{playing && <PauseIcon onClick={togglePlay}/> }
				{!playing && <PlayIcon onClick={togglePlay}/> }

				<span className="playback-rate" onClick={handlePlayback}>
					{controls.playbackRate}x
				</span>

				<CloseIcon onClick={closePlayer}/>

				<input
					name="volume"
					type="range"
					min="0"
					max="1"
					step="0.05"
					value={controls.volume}
					onChange={handleControls}
				/>
			</div>
		</Wrapper>
	);
};

export default AudioPlayer;
