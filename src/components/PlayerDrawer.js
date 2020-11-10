import { useEffect, useState, useRef, useContext } from "react";
import styled, { css } from "styled-components";
import AudioPlayer from "./AudioPlayer";
import { PlayIcon } from "./Icons";
import { PlayerContext } from "../context/PlayerContext";
import { secondsToHMS } from "../utils";

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	z-index: 2;
	width: 460px;
	min-height: 100vh;
	padding-top: 1.5rem;
	background-color: ${props => props.theme.violet};
	transform: translateX(199%);
	transition: all 0.3s ease-in-out;

	img {
		width: 80px;
		height: 80px;
		border-radius: 4px;
		margin-right: 1rem;
	}

	.player-episode {
		display: flex;
		align-items: center;
		padding: 1rem;
	}

	.player-episode span {
		opacity: 0.5;
		font-size: 0.9rem;
	}

	${props =>
		props.open &&
		css`
			transform: translateX(0);
		`}
`;

const PlayerDrawer = () => {
	const { player } = useContext(PlayerContext);

	useEffect(async () => {
		document.querySelector(".show-notes").innerHTML = player.showNotes;
	}, [player.audioUrl]);

	return (
		<Wrapper open={player.open}>
			<div className="player-episode">
				<img src={player.thumbnail} alt="thumbnail" />
				<div className="episode-info">
					<h4>{player.title}</h4>
					<span>{player.published}</span> <span>&bull;</span>{" "}
					<span>{player.duration}</span>
				</div>
			</div>

			<AudioPlayer audioUrl={player.audioUrl} />

			<div className="show-notes"></div>
		</Wrapper>
	);
};

export default PlayerDrawer;