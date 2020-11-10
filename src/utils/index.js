export const client = async (endpoint, { body, ...customConfig } = {}) => {
	const config = {
		method: body ? "POST" : "GET",
		headers: {
			"Content-Type": "applications/json",
			"Accept": "application/json"
		}
	}

	if(body) {
		config.body = JSON.stringify(body);
	}

	const res = await fetch(endpoint, config)
	return res.json()
}

export const stripStr = (str = "", len) =>
  str.length > len ? str.substr(0, len) + "..." : str;

export const secondsToHMS = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);
