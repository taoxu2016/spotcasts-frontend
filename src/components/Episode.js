import { useContext } from "react";
import styled from 'styled-components';
import { PlayerContext } from "../context/PlayerContext";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.violet};
	padding: 1rem;
	border-radius: 4px;
	margin-bottom: 1.5rem;

	img {
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-right: 1rem;
	}

	img:hover {
		filter: brightness(0.6);
		cursor: pointer;
	}

	.episode-info span {
		opacity: 0.5;
		font-size: 0.9rem;
	}
`;

const Episode = ({ episode}) => {
	const { setPlayer } = useContext(PlayerContext);

	const playEpisode = () => {
		setPlayer({...episode, open: true});
	};

	return (
		<Wrapper>
			<img
			  onClick={playEpisode}
				src={episode.thumbnail}
				alt="episode thumbnail"
			/>
			<div className="episode-info">
				<h4>{episode.title}</h4>
				<span>{episode.published}</span> <span>&bull;</span>{" "}
				<span>{episode.duration}</span>
			</div>
		</Wrapper>
	)
};

export default Episode;
