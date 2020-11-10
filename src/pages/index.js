import { useState } from "react";
import styled from 'styled-components';
import Searchbar from "../components/Searchbar";
import Topics from "../components/Topics";
import PodcastsSnap from "../components/PodcastsSnap";
import { client } from "../utils"

const Wrapper = styled.div`
	.snap-topics {
		display: grid;
		grid-template-columns: 1fr 30%;
		grid-gap: 2rem;
	}
`;

const Home = ({ podcasts }) => {
	const [podcastsSt, setPodcasts] = useState(podcasts);
	const [topic, setTopic] = useState('web-design');

	const updatePodcasts = podcasts => setPodcasts(podcasts);
	const updateTopic = topic => setTopic(topic);

	return (
		<Wrapper>
			<Searchbar />

			<div className="snap-topics">
				<div className="snap">
					{podcastsSt.map(podcast => <PodcastsSnap key={podcast.uuid} podcast={podcast}/>)}
				</div>
				<Topics updatePodcasts={updatePodcasts} currentTopic={topic} updateTopic={updateTopic}/>
			</div>
		</Wrapper>
	)
}

export const getStaticProps = async () => {
	const url = 'https://www.listennotes.com/best-web-design-podcasts-140';
	const endpoint = `${process.env.NEXT_PUBLIC_SCRAPY}/?url=${url}&spider_name=podcasts_collection`;

	const { items } = await client(endpoint)

	return {
		props: {
			podcasts: items[0].podcasts
		}
	}
}

export default Home;
