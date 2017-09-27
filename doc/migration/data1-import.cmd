mongoimport --host localhost:27017 --db local-dev --collection customers --file data1.json --upsert
mongoimport --host localhost:3001 --db meteor --collection customers --file data1.json --upsert