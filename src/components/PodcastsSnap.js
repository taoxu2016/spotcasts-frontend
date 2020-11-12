import { useContext } from "react";
import styled from "styled-components";
import { DrawerContext } from "../context/DrawerContext";
import LinkWrapper from "./LinkWrapper";
import { client, stripStr } from "../utils";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.violet};
  border-radius: 4px;
  margin: 2rem 0;
  padding: 1rem;

  img {
    width: 65px;
    height: 65px;
    border-radius: 4px;
    margin-right: 1rem;
  }

  img:hover {
    filter: brightness(0.6);
    cursor: pointer;
  }

  .channel {
    display: flex;
    align-items: center;
  }

  .channel span {
    opacity: 0.5;
    font-size: 0.9rem;
  }

  .description {
    padding-top: 1rem;
    opacity: 0.5;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .ruler {
    height: 2px;
    width: 100%;
    background-color: ${(props) => props.theme.black};
    margin: 1rem 0;
  }

  .latest-episode {
    padding: 0.4rem 0;
  }

  .latest-episode span {
    opacity: 0.5;
    font-size: 0.9rem;
    font-family: ${(props) => props.theme.font2}, sans-serif;
  }
`;

const PodcastsSnap = ({ podcast }) => {
  const { setDrawer } = useContext(DrawerContext);

  const playEpisode = async () => {
    const { episode_link } = podcast.latest_episode;
    const endpoint = `${process.env.NEXT_PUBLIC_BE}/episode?episode_link=${episode_link}`;
    const { data } = await client(endpoint);

    setDrawer({
      title: podcast.latest_episode.title,
      thumbnail: podcast.thumbnail,
      duration: podcast.latest_episode.duration,
      published: podcast.latest_episode.published,
      showNotes: data.show_notes[0],
      audioUrl: data.episode_audio,
      id: data.episode_uuid,
      type: "PLAYER",
      open: true,
    });
  };

  return (
    <Wrapper>
      <div className="channel">
        <img src={podcast.thumbnail} alt="thumbnail" onClick={playEpisode} />
        <LinkWrapper
          href={`/podcasts/${podcast.uuid}`}
          className="channel-info"
        >
          <h3>{podcast.title}</h3>
          <span>{podcast.author}</span>
        </LinkWrapper>
      </div>

      <p className="description">{podcast.description}</p>

      <div className="ruler"></div>

      <div className="latest-episode">
        <h4>{stripStr(podcast.latest_episode.title, 48)}</h4>
        <span>{podcast.latest_episode.duration}</span> <span>&bull;</span>{" "}
        <span>{podcast.latest_episode.published}</span>
      </div>
    </Wrapper>
  );
};

export default PodcastsSnap;
