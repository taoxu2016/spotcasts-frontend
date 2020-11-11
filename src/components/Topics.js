import styled from "styled-components";
import { client } from "../utils";
import topics from "../data/topics";

const Wrapper = styled.div`
	position: fixed !important;
	width: 430px;
	left: 67%;
	margin-top: 2rem;

	h3 {
		margin-bottom: 0.8rem;
		opacity: 0.5;
	}

	span {
		display: inline-block;
		background-color: ${props => props.theme.violet};
		padding: 0.3rem 0.7rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.selected {
		background-color: ${props => props.theme.purple};
		color: white;
	}
`;

const Topics = ({ currentTopic, updatePodcasts, updateTopic }) => {
	const getPodcasts = async ({ url, value: topic }) => {
		updateTopic(topic)
		const endpoint = `${process.env.NEXT_PUBLIC_BE}/podcastsCollection?url=${url}`;
		const { data: podcasts } = await client(endpoint);
		updatePodcasts(podcasts);
	};

	return (
		<Wrapper>
			<h3>Topics</h3>
			{topics.map(topic => (
				<span
					key={topic.label}
					className={currentTopic === topic.value ? "selected" : ""}
					onClick={() => getPodcasts(topic)}
				>
					{topic.label}
				</span>
			))}
		</Wrapper>
	);
};

export default Topics;
