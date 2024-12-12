import Track from '../models/Track.js';
import RecordRetriever from '../utils/RecordUtils.js';

const getAllTracks = async (req, res) => {
  await RecordRetriever.fetchRecords({
    model: Track,
    query: req.query,
    filterParams: ['artist_id', 'album_id', 'hidden'],
    res,
    successMessage: 'Tracks retrieved successfully.'
  });
};

const getTrackByID = async (req, res) => {
  await RecordRetriever.fetchRecordById({
    model: Track,
    idField: 'track_id',
    id: req.params.id,
    res,
    successMessage: 'Track retrieved successfully.',
    notFoundMessage: 'Track not found.'
  });
};

const addNewTrack = async (req, res) => {
  const { artist_id, album_id, name, duration, hidden = false } = req.body;
  await RecordRetriever.addNewRecord({
    model: Track,
    data: { artist_id, album_id, name, duration, hidden },
    res,
    successMessage: 'Track created successfully.'
  });
};

const updateTrack = async (req, res) => {
  await RecordRetriever.updateRecord({
    model: Track,
    idField: 'track_id',
    id: req.params.id,
    updates: req.body,
    res,
    notFoundMessage: 'Track not found.'
  });
};

const deleteTrack = async (req, res) => {
  await RecordRetriever.deleteRecord({
    model: Track,
    idField: 'track_id',
    id: req.params.id,
    res,
    notFoundMessage: 'Track not found.'
  });
};

export default { getAllTracks, getTrackByID, addNewTrack, updateTrack, deleteTrack };