import _ from 'lodash';
import {ADD_SONG_J, FETCH_ALBUM_J, REMOVE_SONG_J, RENAME_SONG_J,CHANGE_SONG_PRIVACY_J} from "../actions/index";

export default function (state={},action) {
  switch(action.type){
    case FETCH_ALBUM_J:
      return action.payload.data;
    case RENAME_SONG_J:
      return action.payload.data;
    case REMOVE_SONG_J:
      return action.payload.data;
    case ADD_SONG_J:
      return action.payload.data;
    case CHANGE_SONG_PRIVACY_J:
      return action.payload.data;
    default:
      return state;
  }
}