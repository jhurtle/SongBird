import _ from 'lodash';
import {FETCH_ALBUMS2, ACT_DELALBUM, CREATE_ALBUM_A} from "../actions/index";

export default function (state={},action) {
    switch(action.type) {
        case FETCH_ALBUMS2:
            return _.mapKeys(action.payload.data,'id');
        case ACT_DELALBUM:
            return {...action.payload.data};
      case CREATE_ALBUM_A:
        return action.payload.data;
        default:
            return state;
    }
}

