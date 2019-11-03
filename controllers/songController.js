const {query} = require('../db/promise-mysql.js')
const {cp} = require('../db/connection.js')
const mysql = require('mysql')

exports.getSongs = (req, res) => {
    
    return query(cp, 'SELECT a.name AS album_name, s.name AS song_name FROM song s LEFT JOIN album a ON s.album_id = a.album_id')
        .then(result => res.send(result))
        .catch(error => {console.log(error)})
    
    // let songs = [
    //         {
    //             song_name: "Saint Tropez"
    //         },
    //         {
    //             song_name: "Circles"
    //         }
    //     ]
        
    // res.send(songs)
}

exports.getAlbumSongs = (req, res) => {
    return query(cp, 'SELECT * FROM songs_on_albums;')
        .then(result => res.send(result))
        .catch(error => {console.log(error)})
}

exports.createSong = (req, res) => {
    const {name, album_id} = req.body
    
    query(cp, `INSERT INTO song(name, album_id) VALUES (${mysql.escape(name)}, ${album_id == '0' ? 'NULL' : mysql.escape(album_id)});`)
        .then(result => res.send(result))
        .catch(error => {console.log(error)})
}