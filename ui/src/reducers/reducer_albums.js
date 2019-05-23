import _ from 'lodash';
import {
  FETCH_ALBUMS, FETCH_ARTISTS, FETCH_SONGS, FETCH_ALBUM, FETCH_ARTIST, FETCH_USER, FETCH_USERS,
  ACT_DELUSER, ACT_DELALBUM, UPDATE_ARTIST_BIO_J, UPDATE_ALBUM_J, RENAME_SONG_J, RENAME_ARTIST_J,
  CHANGE_ARTIST_PROFILE_J, CREATE_ALBUM_J,ADD_CONCERT_J,UPDATE_CONCERT_J,REMOVE_CONCERT_J,ACT_CREATEACCOUNTA,
    BAN_USER
} from "../actions/index";

export default function (state={},action) {
  switch(action.type){
    case FETCH_ALBUMS:
      return _.mapKeys(action.payload.data,'id');
    case FETCH_ARTISTS:
      return _.mapKeys(action.payload.data,'id');
    case FETCH_ALBUM:
      return action.payload.data;
    case FETCH_SONGS:
      return _.mapKeys(action.payload.data,'id');
    case FETCH_ARTIST:
      return action.payload.data;
    case FETCH_USER:
      return action.payload.data;
    case FETCH_USERS:
      return _.mapKeys(action.payload.data,'id');
    case UPDATE_ARTIST_BIO_J:
      return action.payload.data;
    case UPDATE_ALBUM_J:
        return action.payload.data;
    case RENAME_ARTIST_J:
      return action.payload.data;
    case CHANGE_ARTIST_PROFILE_J:
      return action.payload.data;
    case CREATE_ALBUM_J:
      return action.payload.data;
    case ADD_CONCERT_J:
      return action.payload.data;
    case UPDATE_CONCERT_J:
      return action.payload.data;
    case REMOVE_CONCERT_J:
      return action.payload.data;
      case BAN_USER:
          return {...action.payload.data};
    case ACT_DELUSER:
      return {...action.payload.data};
      case ACT_CREATEACCOUNTA:
          return _.mapKeys(action.payload.data,'id');
    default:
      return state;
  }
}