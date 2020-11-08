import styled from "styled-components";
import data from "../../data/podcasts.json";
import { client } from '../../utils'

const Wrapper = styled.div`
	.banner {
		display: flex;
		align-items: center;
		margin-bottom: 2.5rem;
	}

	.banner img {
		width: 150px;
		height: 150px;
		border-radius: 10px;
		margin-right: 1rem;
	}

	.banner-info h3 {
		padding-top: 0.3rem;
		opacity: 0.6;
	}

	.episodes-about {
		display: grid;
		grid-template-columns: 1fr 30%;
		grid-gap: 2rem;
	}

	.episode {
		display: flex;
		align-items: center;
		background-color: ${props => props.theme.violet};
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1.5rem;
	}

	.episode img {
		width: 80px;
		height: 80px;
		border-radius: 4px;
		margin-right: 1rem;
	}

	.episode span {
		opacity: 0.5;
	}

	.about p {
		opacity: 0.8;
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

const ViewPodcasts = () => {
	const [podcast] = data;

	const searchEpisodes = async e => {
		const { uuid } = podcast;
		const searchTerm = e.target.value;

		const data = await client(`http:localhost:3000/api/episodes?searchTerm=${searchTerm}&uuid=${uuid}`);
		console.log(data);
	}

	return (
		<Wrapper>
			<div className="banner">
				<img src={podcast.thumbnail} alt="banner" />
				<div className="banner-info">
					<h2>{podcast.text}</h2>
					<h3>{podcast.host}</h3>
				</div>
			</div>

			<div className="episodes-about">

				<div className="episodes">
					{podcast.previous_episodes.map(episode => (
						<div className="episode">
							<img src={podcast.thumbnail} alt="episode thumbnail" />
							<div className="episode-info">
								<h3>{episode.title}</h3>
								<span>{episode.aired_on}</span> {" "}
								<span>&bull;</span> {" "}
								<span>{episode.duration}</span>
							</div>
						</div>
					))}
				</div>

				<div className="about">
					<h2>About</h2>
					<p>{podcast.description}</p>
					<input type="text" placeholder="search episodes" onKeyUp={searchEpisodes}/>
				</div>
			</div>
		</Wrapper>
	);
};

export default ViewPodcasts;
