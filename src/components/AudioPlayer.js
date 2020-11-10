import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PlayIcon } from "./Icons";
import { PlayerContext } from '../context/PlayerContext'
import { secondsToHMS } from "../utils";

const Wrapper = styled.div`
	.progress-bar {
		width: 100%;
		height: 3px;
		margin-top: 1.3rem;
		cursor: pointer;
	}

	.progress-filled {
		width: 0;
		height: 3px;
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
		justify-content: center;
	}

	.player svg {
		width: 24px;
		height: 24px;
		fill: ${props => props.theme.primaryColor};
	}

	.player svg:hover {
		cursor: pointer;
	}
`;

const AudioPlayer = ({ audioUrl }) => {
	const { setPlayer } = useContext(PlayerContext)
	const [showRuntime, setShowRuntime] = useState(false);

	const audioRef = useRef(null);
	const progressRef = useRef(null);

	const scrub = e => {
		const audioPlayer = audioRef.current;
		const progress = progressRef.current;

		const time = (e.nativeEvent.offsetX / progress.offsetWidth) * audioPlayer.duration;
		audioPlayer.currentTime = time;
	};

	useEffect(() => {
		const audioPlayer = audioRef.current;
		const progress = progressRef.current;

		audioPlayer.addEventListener("timeupdate", () => {
			const progressFilled = document.querySelector(".progress-filled");
			const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
			progressFilled.style.width = `${percent}%`;
		});

		audioPlayer.addEventListener("ended", () => {
			setPlayer({ open: false });
		})

		progress.addEventListener("mousemove", e => {
			setShowRuntime(true);

			const runtime = document.querySelector(".runtime");
			const duration =(e.offsetX / progress.offsetWidth) * audioPlayer.duration;
			runtime.innerText = secondsToHMS(duration);

			const width = (e.offsetX / progress.offsetWidth) * 100;
			if(width <= 80) {
				runtime.style.left = `${e.offsetX}px`;
			} else {
				runtime.style.left = `${e.offsetX - 70}px`;
			}
		});

		progress.addEventListener("mouseleave", e => setShowRuntime(false));

		audioPlayer.src = audioUrl;
		audioPlayer.play();
		audioPlayer.volume = 0.3;
	}, [audioUrl]);

	return (
		<Wrapper>
			<div ref={progressRef} className="progress-bar" onClick={scrub}>
				<div className="progress-filled"></div>
				{showRuntime && <span className="runtime"></span>}
			</div>

			<div className="player">
				<audio ref={audioRef} style={{ display: "none" }} />
				<PlayIcon onClick={() => setPlayer({ open: false })} />
			</div>
		</Wrapper>
	);
};

export default AudioPlayer;
