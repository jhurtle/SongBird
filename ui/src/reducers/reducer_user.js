import _ from 'lodash';
import {ACT_LOGIN, CHECK_LOGIN, ACT_LOGOUT, UPDATE_USER, DELETE_USER} from "../actions/index";

export default function (state={},action) {
  switch(action.type){
    case ACT_LOGIN:
      return {...action.payload.data};
    case ACT_LOGOUT:
      return {...action.payload.data};
    case CHECK_LOGIN:
      return {...action.payload.data};
    case UPDATE_USER:
      return {...action.payload.data};
    case DELETE_USER:
      return {...action.payload.data};
    default:
      return state;
  }
}