# SpotCasts - Frontend

SpotCasts - listen to podcasts, subscribe to podcasts, save individual episodes. Built with nextjs and styled-components. This is the frontend repository, click [here](https://github.com/manikandanraji/spotcasts-backend) to visit the backend repo.

## Running Locally

1. Make sure to setup the [backend repo](https://github.com/manikandanraji/spotcasts-backend) first

2. Once done, create .env file at the root directory 

   ```bash
	NEXT_PUBLIC_BE=http://localhost:3000/api
	NEXT_PUBLIC_SCRAPY=http://localhost:9080/crawl.json

	# listen notes
	NEXT_PUBLIC_LN_PODCAST=https://www.listennotes.com/podcasts
	NEXT_PUBLIC_LN_SEARCH=https://www.listennotes.com/search
	NEXT_PUBLIC_LN_EPISODES=https://www.listennotes.com/endpoints/v1/channels
	 ```

3. Then, install the dependencies and start the dev server

	 ```bash
	 npm i && npm run dev
	 ```

## Features

1. Search Podcasts
2. Listen to podcasts
3. Save podcasts 
4. Subscribe to podcasts
5. Access podcasts by categories

## UI

### Home
![Home](screenshots/home.png)

### Subscriptions
![Subscriptions](screenshots/subscriptions.png)

### Listen Later
![Listen Later](screenshots/listen_later.png)

### View Podcasts
![View Podcasts](screenshots/view_podcasts.png)

### Player #1
![Player #1](screenshots/player.png)

### Player #2
![Player #2](screenshots/home_player.png)
