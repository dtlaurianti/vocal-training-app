To select Docker volume/local mount to persist data use -v flag when running container

`docker run --name database --rm --network hackathon -v 'C:/Users/dtlau/git/hackathon/database/persist:/var/lib/mysql' -p 3306:3306 database`

The database may need to be reinstantiated (`rm -rf persist`) to change database schema
