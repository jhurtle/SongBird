import _ from 'lodash';
import {CHANGE_SONG_PENDING_A, FETCH_ALBUMA, REMOVE_SONG_A} from "../actions/index";

export default function (state={},action) {
    switch(action.type) {
        case FETCH_ALBUMA:
            return action.payload.data;
        case REMOVE_SONG_A:
            return action.payload.data;
      case CHANGE_SONG_PENDING_A:
          return action.payload.data;
        default:
            return state;
    }
}

