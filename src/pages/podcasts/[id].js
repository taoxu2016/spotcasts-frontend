import { useEffect, useContext, useRef, useState } from "react";
import Head from 'next/head';
import styled from "styled-components";
import Episode from "../../components/Episode";
import { PlayerContext } from '../../context/PlayerContext';
import { client, secondsToHMS } from "../../utils";

const Wrapper = styled.div`
	.banner {
		display: flex;
		align-items: center;
		margin-bottom: 2.5rem;
	}

	.banner-info h4 {
		padding-top: 0.3rem;
		opacity: 0.6;
	}

	.episodes-about {
		display: grid;
		grid-template-columns: 1fr 30%;
		grid-gap: 2rem;
	}

	.about p {
		opacity: 0.8;
		line-height: 1.8;
	}

	.btn {
		padding: 0.5rem 1rem;
		background-color: ${props => props.theme.violet};
		border: 1px solid ${props => props.theme.violet};
		color: ${props => props.theme.primaryColor};
		border-radius: 4px;
	}

	input {
		padding: 0.5rem 1rem;
		background-color: ${props => props.theme.violet};
		color: ${props => props.theme.primaryColor};
		border: 1px solid ${props => props.theme.violet};
		border-radius: 4px;
		margin-top: 1rem;
	}
`;

const ViewPodcasts = ({ channel, episodes, nextPubDate }) => {
	const { player } = useContext(PlayerContext);
	const [nextPubDateSt, setNextPubDate] = useState(nextPubDate);
	const [episodesSt, setEpisodes] = useState(episodes);

	const getMoreEpisodes = async () => {
		const endpoint = `${process.env.NEXT_PUBLIC_BE}/episodes?uuid=${channel.channel_uuid}&nextPubDate=${nextPubDateSt}`;
		const { data } = await client(endpoint)
		setEpisodes(episodes => [...episodes, ...data.episodes]);
		setNextPubDate(data.nextPubDate);
	}

	return (
		<Wrapper>
			<Head>
				<title>{channel.title}</title>
			</Head>

			<div className="banner">
				<div className="banner-info">
					<h3>{channel.title}</h3>
					<h4>{channel.author}</h4>
				</div>
			</div>

			<div className="episodes-about">
				<div className="episodes">
					{episodesSt.map(episode => (
						<Episode
							key={episode.id}
							episode={episode}
						/>
					))}

					<button className="btn" onClick={getMoreEpisodes}>Load More</button>
				</div>

				{!player.open && <div className="about">
					<h2>About</h2>
					<div dangerouslySetInnerHTML={{__html: channel.description}} />
				</div>}
			</div>
		</Wrapper>
	);
};

export default ViewPodcasts;

export async function getServerSideProps({ params: { id } }) {
	const endpoint = `${process.env.NEXT_PUBLIC_BE}/episodes?uuid=${id}&nextPubDate=${new Date().getTime()}`
	const { data: { channel, nextPubDate, episodes } }  = await client(endpoint)
	return { props: { channel, episodes, nextPubDate } }
}
