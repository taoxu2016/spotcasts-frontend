import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import Episode from "../../components/Episode";
import { DrawerContext } from "../../context/DrawerContext";
import { client, secondsToHMS } from "../../utils";

const Wrapper = styled.div`
	margin-top: 2rem;

	.banner {
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
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
		padding: 0.3rem 1rem;
		background-color: ${props => props.theme.violet};
		border: 1px solid ${props => props.theme.violet};
		color: ${props => props.theme.primaryColor};
		border-radius: 4px;
	}

	.subscribe {
		margin-top: 0.8rem;
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
	const { drawer } = useContext(DrawerContext);
	const router = useRouter();

	const [channel, setChannel] = useState(null);
	const [episodes, setEpisodes] = useState([]);
	const [nextPubDate, setNextPubDate] = useState(null);
	const [subscribe, setSubscribe] = useState(null);

	const subscribeToChannel = () => {
		const subscriptions =
			JSON.parse(localStorage.getItem("subscriptions")) || [];

		const subscription = {
			id: router.query.id,
			name: channel.title,
			author: channel.author,
			thumbnail: channel.channel_image_big
		};

		const updatedSubscriptions = [...subscriptions, subscription];
		localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
		setSubscribe(true);
	};

	const unsubscribeFromChannel = () => {
		const subscriptions =
			JSON.parse(localStorage.getItem("subscriptions")) || [];
		const updatedSubscriptions = subscriptions.filter(
			sub => sub.name !== channel.title
		);
		localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
		setSubscribe(false);
	};

	const getMoreEpisodes = async () => {
		const endpoint = `${process.env.NEXT_PUBLIC_BE}/episodes?uuid=${channel.channel_uuid}&nextPubDate=${nextPubDate}`;
		const { data } = await client(endpoint);
		setEpisodes(episodes => [...episodes, ...data.episodes]);
		setNextPubDate(data.nextPubDate);
	};

	useEffect(async () => {
		try {
			const endpoint = `${process.env.NEXT_PUBLIC_BE}/episodes?uuid=${
				router.query.id
			}&nextPubDate=${new Date().getTime()}`;

			const {
				data: { channel, nextPubDate, episodes }
			} = await client(endpoint);

			setChannel(channel);
			setNextPubDate(nextPubDate);
			setEpisodes(episodes);

			const subscriptions =
				JSON.parse(localStorage.getItem("subscriptions")) || [];

			const isSubscribed = subscriptions.find(
				sub => sub.name === channel.title
			);
			setSubscribe(isSubscribed);
		} catch (err) {
			console.log(err.message);
		}
	}, [router.query.id]);

	if(episodes.length < 1) {
		return <></>
	}

	return (
		<Wrapper>
			<Head>
				<title>{channel?.title}</title>
			</Head>

			<div className="banner">
				<div className="banner-info">
					<h3>{channel?.title}</h3>
					<h4>{channel?.author}</h4>
				</div>
			</div>

			<div className="episodes-about">
				<div className="episodes">
					{episodes.map(episode => (
						<Episode key={episode.id} episode={episode} />
					))}

					<button className="btn" onClick={getMoreEpisodes}>
						Load More
					</button>
				</div>

				{!drawer.open && (
					<div className="about">
						<h2>About</h2>
						<div dangerouslySetInnerHTML={{ __html: channel.description }} />

						{!subscribe && (
							<button className="btn subscribe" onClick={subscribeToChannel}>
								Subscribe
							</button>
						)}

						{subscribe && (
							<button
								className="btn subscribe"
								onClick={unsubscribeFromChannel}
							>
								Subscribed
							</button>
						)}
					</div>
				)}
			</div>
		</Wrapper>
	);
};

export default ViewPodcasts;
