import _ from 'lodash';
import {ADD_SONG_J, FETCH_ALBUM_J, REMOVE_SONG_J, RENAME_SONG_J, UPDATE_ARTIST_BIO_J} from "../actions/index";

export default function (state={},action) {
  switch(action.type){
    case UPDATE_ARTIST_BIO_J:
      console.log("get new bio");
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}