const {query} = require('./promise-mysql.js')
const {cp} = require('./connection.js')

query(cp, 'DROP TABLE IF EXISTS song; DROP TABLE IF EXISTS album;')
    .then(result => query(cp, 'CREATE TABLE album (album_id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, genre VARCHAR(255), PRIMARY KEY(album_id));'))
    .then(result => query(cp, 'CREATE TABLE song (song_id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, album_id INT, PRIMARY KEY(song_id), FOREIGN KEY(album_id) REFERENCES album(album_id));'))
    .then(result => query(cp, 'DROP VIEW IF EXISTS songs_on_albums; CREATE VIEW songs_on_albums AS SELECT name FROM song WHERE album_id IS NOT NULL;'))
    .then(result => {console.log(result); process.exit()})
    .catch(error => {console.log(error)})