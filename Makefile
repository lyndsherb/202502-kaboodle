up:
	docker-compose up -d;

down:
	docker-compose down;

restart: 
	make down;
	make up;

rebuild: 
	make down;
	docker-compose up -d --build;

remove:
	make down;
	docker volume rm lhe_kaboodle_data;
	docker image rm lhe_kaboodletest-events lhe_kaboodletest-api 
	docker container rm lhe_kaboodle_api lhe_kaboodle_events;
