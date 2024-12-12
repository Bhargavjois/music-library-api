import Album from '../models/Album.js';
import RecordRetriever from '../utils/RecordUtils.js';

const getAllAlbums = async (req, res) => {
  await RecordRetriever.fetchRecords({
    model: Album,
    query: req.query,
    filterParams: ['artist_id', 'hidden'],
    res,
    successMessage: 'Albums retrieved successfully.'
  });
};

const getAlbumByID = async (req, res) => {
  await RecordRetriever.fetchRecordById({
    model: Album,
    idField: 'album_id',
    id: req.params.id,
    res,
    successMessage: 'Album retrieved successfully.',
    notFoundMessage: 'Album not found.'
  });
};

const addNewAlbum = async (req, res) => {
  const { artist_id, name, year, hidden = false } = req.body;
  await RecordRetriever.addNewRecord({
    model: Album,
    data: { artist_id, name, year, hidden },
    res,
    successMessage: 'Album created successfully.'
  });
};

const updateAlbum = async (req, res) => {
  await RecordRetriever.updateRecord({
    model: Album,
    idField: 'album_id',
    id: req.params.id,
    updates: req.body,
    res,
    notFoundMessage: 'Album not found.'
  });
};

const deleteAlbum = async (req, res) => {
  await RecordRetriever.deleteRecord({
    model: Album,
    idField: 'album_id',
    id: req.params.id,
    res,
    notFoundMessage: 'Album not found.'
  });
};

export default { getAllAlbums, getAlbumByID, addNewAlbum, updateAlbum, deleteAlbum };