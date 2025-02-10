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
	docker image rm lhe_kaboodle/api lhe_kaboodle/events
