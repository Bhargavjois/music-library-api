import Artist from '../models/Artist.js';
import RecordRetriever from '../utils/RecordUtils.js';

const getAllArtists = async (req, res) => {
  await RecordRetriever.fetchRecords({
    model: Artist,
    query: req.query,
    filterParams: ['grammy', 'hidden'],
    res,
    successMessage: 'Artists retrieved successfully.'
  });
};

const getArtistByID = async (req, res) => {
  await RecordRetriever.fetchRecordById({
    model: Artist,
    idField: 'artist_id',
    id: req.params.id,
    res,
    successMessage: 'Artist retrieved successfully.',
    notFoundMessage: 'Artist not found.'
  });
};

const addNewArtist = async (req, res) => {
  const { name, grammy = 0, hidden = false } = req.body;
  await RecordRetriever.addNewRecord({
    model: Artist,
    data: { name, grammy, hidden },
    res,
    successMessage: 'Artist created successfully.'
  });
};

const updateArtist = async (req, res) => {
  await RecordRetriever.updateRecord({
    model: Artist,
    idField: 'artist_id',
    id: req.params.id,
    updates: req.body,
    res,
    notFoundMessage: 'Artist not found.'
  });
};

const deleteArtist = async (req, res) => {
  await RecordRetriever.deleteRecord({
    model: Artist,
    idField: 'artist_id',
    id: req.params.id,
    res,
    notFoundMessage: 'Artist not found.'
  });
};

export default { getAllArtists, getArtistByID, addNewArtist, updateArtist, deleteArtist };