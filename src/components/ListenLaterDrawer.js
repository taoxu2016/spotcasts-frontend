import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CloseIcon } from "./Icons";
import { DrawerContext } from "../context/DrawerContext";
import { stripStr, client } from "../utils";

const Wrapper = styled.div`
	padding: 1rem;

	h3 {
		margin-bottom: 1.6rem;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header svg {
		width: 20px;
		height: 20px;
		position: relative;
		top: -10px;
		margin-right: 1rem;
		fill: ${props => props.theme.primaryColor};
	}

	.episode {
		margin-bottom: 1.3rem;
		display: flex;
		align-items: center;
	}

	.episode img {
		width: 45px;
		height: 45px;
		border-radius: 4px;
		box-shadow: ${props => props.theme.bs1};
		margin-right: 1rem;
	}

	.episode img:hover {
		filter: brightness(0.5);
		cursor: pointer;
	}

	.episode-meta {
		font-size: 0.9rem;
		opacity: 0.5;
	}
`;

const ListenLaterDrawer = () => {
	const { setDrawer } = useContext(DrawerContext);
	const [episodes, setEpisodes] = useState([]);

	const playEpisode = async (episode) => {
		const { episode_link } = episode;
		const endpoint = `${process.env.NEXT_PUBLIC_BE}/episode?episode_link=${episode_link}`;
		const { data } = await client(endpoint);

		setDrawer({
			...episode,
			showNotes: data.show_notes[0],
			audioUrl: data.episode_audio,
			triggeredFrom: "LISTEN_LATER",
			type: "PLAYER",
			open: true
		});
	};

	useEffect(() => {
		const listenLater = JSON.parse(localStorage.getItem("listenLater")) || [];
		setEpisodes(listenLater);
	}, []);

	return (
		<Wrapper>
			<div className="header">
				<h3>Listen Later</h3>
				<CloseIcon onClick={() => setDrawer({ open: false })} />
			</div>

			{episodes.map(episode => (
				<div className="episode">
					<img
						src={episode.thumbnail}
						alt="thumbnail"
						onClick={() => playEpisode(episode)}
					/>
					<div className="episode-info">
						<span>{stripStr(episode.title, 35)}</span>

						<div className="episode-meta">
							<span>{episode.published}</span> <span>&bull;</span>{" "}
							<span>{episode.duration}</span>
						</div>
					</div>
				</div>
			))}
		</Wrapper>
	);
};

export default ListenLaterDrawer;
