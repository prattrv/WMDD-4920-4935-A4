const express = require('express')
const router = express.Router()

const {getSongs, createSong, getAlbumSongs} = require('../controllers/songController.js')

router.get('/', getSongs)

router.post('/', createSong)

router.get('/album-songs', getAlbumSongs)

module.exports = router