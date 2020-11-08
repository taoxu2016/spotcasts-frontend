import nc from 'next-connect'
import { client } from '../../utils';

const handler = nc()
	.get(async (req, res) => {
		const { uuid, searchTerm } = req.query;

		const endpoint = `https://www.listennotes.com/search/?ocid=${uuid}&q=${searchTerm}`
		const data = await client(endpoint);

		res.status(200).json({ success: true, data })
	})

export default handler;
