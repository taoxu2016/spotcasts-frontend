import styled from "styled-components";
import { client } from "../utils";
import topics from "../data/topics";

export const StyledTopics = styled.div`
	margin-top: 2rem;

	h3 {
		margin-bottom: 0.4rem;
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
		box-shadow: ${props => props.theme.bs1};
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
		<StyledTopics>
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
		</StyledTopics>
	);
};

export default Topics;
