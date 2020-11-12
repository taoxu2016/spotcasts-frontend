import nc from "next-connect";
import { client } from "../../utils";

const handler = nc().get(async (req, res) => {
  const { uuid, nextPubDate } = req.query;

  const endpoint = `${process.env.NEXT_PUBLIC_LN_EPISODES}/${uuid}/episodes?next_pub_date=${nextPubDate}`;
  const { bundle } = await client(endpoint);

  const episodes = bundle.episodes.map((episode) => ({
    id: episode.episode_uuid,
    title: episode.title,
    duration: episode.audio_length_humanized,
    published: episode.pub_date_pretty,
    pubDate: episode.pub_date_ms,
    showNotes: episode.description,
    audioUrl: episode.audio_play_url_extension,
    thumbnail: episode.channel.channel_image_big,
    episode_link: episode.absolute_url,
  }));

  const { channel } = bundle.episodes[0];

  res
    .status(200)
    .json({
      success: true,
      data: { episodes, channel, nextPubDate: bundle.next_pub_date },
    });
});

export default handler;

// timestamp: 1602009000000
// uuid: 083e27920aa049c7a4b035f3acb24272
