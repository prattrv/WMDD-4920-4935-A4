const mysql = require('mysql')
const {query} = require('../db/promise-mysql.js')
const {cp} = require('../db/connection.js')

exports.getAlbums = (req, res) => {
    let albums = query(cp, `SELECT * FROM album;`)
        .then(result => result)
        .catch(error => {console.log(error)})
        
    let songs = query(cp, `SELECT * FROM song;`)
        .then(result => result)
        .catch(error => {console.log(error)})
        
    return Promise.all([albums, songs])
        .then(values => {
            let albums = values[0]
            let songs = values[1]
            
            albums = albums.map(album => {
                album.songs = (songs.filter(song => song.album_id == album.album_id)).map(song => song.name)
                return album
            })
            
            res.send(albums)
        })
}

exports.createAlbum = (req, res) => {
    const {name, genre} = req.body
    query(cp, `INSERT INTO album(name, genre) VALUES (${mysql.escape(name)}, ${mysql.escape(genre)});`)
        .then(result => {res.send(result)})
        .catch(error => {console.log(error)})
}