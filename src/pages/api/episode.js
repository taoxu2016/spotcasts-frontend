import nc from "next-connect";
import { client } from "../../utils";

const handler = nc().get(async (req, res) => {
  const { episode_link } = req.query;

  const endpoint = `${process.env.NEXT_PUBLIC_SCRAPY}?url=${episode_link}&spider_name=episode`;
  const { items } = await client(endpoint);

  res.status(200).json({ success: true, data: items[0] });
});

export default handler;
