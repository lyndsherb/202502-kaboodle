up:
	docker-compose up -d;
	make frontend;

down:
	docker-compose down;

restart: 
	make down;
	make up;

rebuild: 
	make down;
	docker-compose up -d --build;
	# If you choose to uncomment the events container in the docker-compose,
	# please remove this line otherwise you'll wind up with two front-ends! 
	make frontend;
	
frontend:
	cd events && npm ci && npm run dev;

remove:
	make down;
	docker volume rm lhe_kaboodle_data;
	docker image rm lhe_kaboodle/api
