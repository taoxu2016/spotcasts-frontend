import nc from 'next-connect'
import { client } from '../../utils';

const handler = nc()
	.get(async (req, res) => {
		const { searchTerm } = req.query;

		const endpoint = `https://www.listennotes.com/endpoints/v1/channels/search/typeahead/?q=${searchTerm}`
		const data = await client(endpoint);

		res.status(200).json({ success: true, data })
	})

export default handler;
