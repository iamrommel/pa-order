import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from "redux-form";

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';

export default combineReducers({

    drawer,
    cardNavigation,
    routes,
    form: reduxFormReducer
});
