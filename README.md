# Travis-ci.com Log Viewer

`travis-ci.com` should log in to view the build log. This is a simple nodejs service for viewing build log without login.


## How to use

1. get `access_token` and `repository_id` using travis-ci api explorer

	a. visit this url and get `access_token`

	- [https://developer.travis-ci.com/explore#explorer](https://developer.travis-ci.com/explore#explorer)
	
		```bash	
		curl -H "Travis-API-Version: 3" -H "User-Agent: API Explorer" \
		-H "Authorization: token ___token_here___" \
		https://api.travis-ci.com/
		...
		```

	b. change api endpoint and find `repository_id` for viewing build log
	
	- /repos
	
		```json
		...
		"repositories":    [
			{
				...
				"id": ___repository_id_here___,
				...
			}
		]
		...
		```
	
2. copy and modify .env

	```bash
	$ cp .env.sample .env
	```
	
	```
	// .env
	TOKEN=___access_token___
	REPOID=___repository_id___
	```

3. run

	```bash
	$ npm install
	$ npm start
	```
	
4. open browser and open `localhost:8080`


## Heroku

You can run it free at [`heroku.com`](www.heroku.com).

1. Create heroku app and add environment variables (in .env.sample) to heroku app using heroku dashboard `Settings` tab.
2. Fork this repository to your github.
3. Set Deployment method to forked repository to you heroku app using heroku dashboard `Deploy` tab.
3. Click `Deploy branch`

Have fun!


## License

MIT License