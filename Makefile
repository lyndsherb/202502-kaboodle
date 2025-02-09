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
