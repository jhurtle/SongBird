import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import AlbumsReducer from './reducer_albums';
import QueueReducer from './reducer_queue';
import UserReducer from './reducer_user';
import AdminReducer from './reducer_admin';
import AdminReducer2 from './reducer_admin2';
import AlbumReducer from './reducer_album';
import AdminReducer3 from './reducer_admin3';
import AdminReducer4 from './reducer_admin4';
import artistUpdateInfo from './reducer_updateArtistInfo';

const rootReducer = combineReducers({
  form: formReducer,
  albums: AlbumsReducer,
  album: AlbumReducer,
  updateArtistInfo: artistUpdateInfo,
  user: UserReducer,
  queue: QueueReducer,
    amin: AdminReducer,
    amin2: AdminReducer2,
    amin3: AdminReducer3,
    amin4: AdminReducer4
});

export default rootReducer;
