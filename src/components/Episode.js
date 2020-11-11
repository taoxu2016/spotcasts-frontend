import { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { BookmarkIcon } from "./Icons";
import { DrawerContext } from "../context/DrawerContext";

const Wrapper = styled.div`
	position: relative;
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

	svg {
		position: absolute;
		fill: ${props => props.theme.sliderBg};
		filter: brightness(0.6);
		top: 0;
		right: 10px;
	}

	${props =>
		props.present &&
		css`
			svg {
				fill: ${props => props.theme.red};
				filter: brightness(1);
			}
		`}
`;

const Episode = ({ episode }) => {
	const { setDrawer } = useContext(DrawerContext);
	const [present, setPresent] = useState(null);

	const addToListenLater = () => {
		const listenLater = JSON.parse(localStorage.getItem("listenLater")) || [];

		const updatedListenLater = [...listenLater, { 
			thumbnail: episode.thumbnail,
			id: episode.id,
			title: episode.title,
			duration: episode.duration,
			published: episode.published,
			episode_link: episode.episode_link,
		}];

		localStorage.setItem("listenLater", JSON.stringify(updatedListenLater));
		setPresent(true);
	};

	const removeFromListener = () => {
		const listenLater = JSON.parse(localStorage.getItem("listenLater")) || [];
		const updatedListenLater = listenLater.filter(el => el.id !== episode.id);

		localStorage.setItem("listenLater", JSON.stringify(updatedListenLater));
		setPresent(false);
	};

	const playEpisode = () => {
		setDrawer({ ...episode, type: "PLAYER", open: true });
	};

	useEffect(() => {
		const listenLater = JSON.parse(localStorage.getItem("listenLater")) || [];
		const present = listenLater.find(el => el.id === episode.id);
		setPresent(present);
	}, []);

	return (
		<Wrapper present={present}>
			<img
				onClick={playEpisode}
				src={episode.thumbnail}
				alt="episode thumbnail"
			/>
			<div className="episode-info">
				<h4>{episode.title}</h4>
				<span>{episode.published}</span> <span>&bull;</span>{" "}
				<span>{episode.duration}</span>
				<BookmarkIcon onClick={!present ? addToListenLater : removeFromListener}/>

			</div>
		</Wrapper>
	);
};

export default Episode;
