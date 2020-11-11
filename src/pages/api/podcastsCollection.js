import nc from "next-connect";
import { client } from "../../utils";

const handler = nc().get(async (req, res) => {
	const { url } = req.query;

	const endpoint = `${process.env.NEXT_PUBLIC_SCRAPY}?url=${url}&spider_name=podcasts_collection`;
	const { items } = await client(endpoint);

	res.status(200).json({ success: true, data: items[0].podcasts });
});

export default handler;
