import _ from 'lodash';
import {UPGRADE_USER_ARTIST,DOWNGRADE_ARTIST} from "../actions/index";

export default function (state={},action) {
    switch(action.type) {
        case UPGRADE_USER_ARTIST:
            return {...action.payload.data};
        case DOWNGRADE_ARTIST:
            return {...action.payload.data};
        default:
            return state;
    }
}

