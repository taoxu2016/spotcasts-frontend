import nc from 'next-connect'
import { client } from '../../utils';

const handler = nc()
	.get(async (req, res) => {
		const { searchTerm } = req.query;

		const endpoint = `https://www.listennotes.com/endpoints/v1/channels/search/typeahead/?q=${searchTerm}`
		const { results } = await client(endpoint);

		res.status(200).json({ success: true, data: results.slice(0, 3) })
	})

export default handler;
