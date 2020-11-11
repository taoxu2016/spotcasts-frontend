import { useEffect, useContext } from 'react';
import Head from "next/head";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import { DrawerContext } from '../context/DrawerContext';

const Wrapper = styled.div`
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
`;

const PlayerDrawer = () => {
	const { drawer } = useContext(DrawerContext);

	useEffect(async () => {
		document.querySelector(".show-notes").innerHTML = drawer.showNotes;
	}, [drawer.audioUrl]);

	return (
		<Wrapper>
			<Head>
				<title>{drawer.title || "SpotCasts"}</title>
			</Head>

			<div className="player-episode">
				<img src={drawer.thumbnail} alt="thumbnail" />
				<div className="episode-info">
					<h4>{drawer.title}</h4>
					<span>{drawer.published}</span> <span>&bull;</span>{" "}
					<span>{drawer.duration}</span>
				</div>
			</div>

			<AudioPlayer audioUrl={drawer.audioUrl} episodeId={drawer.id} />

			<div className="show-notes"></div>
		</Wrapper>
	);
};

export default PlayerDrawer;
