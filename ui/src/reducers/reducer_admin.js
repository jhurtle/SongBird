import _ from 'lodash';
import {FETCH_ARTISTS2, ACT_DELARTIST} from "../actions/index";

export default function (state={},action) {
    switch(action.type) {
        case FETCH_ARTISTS2:
            return _.mapKeys(action.payload.data,'id');
        case ACT_DELARTIST:
            return {...action.payload.data};
        default:
            return state;
    }
}

