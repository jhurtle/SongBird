import {FETCH_SONGtoPLAY, FETCH_ALBUMtoPLAY} from "../actions/index";
import _ from 'lodash';


export default function (state={}, action) {
  switch (action.type) {
    case FETCH_SONGtoPLAY:
      return [action.payload.data];
    case FETCH_ALBUMtoPLAY:
      return action.payload.data.tracks;
    default:
      return state;
  }
}