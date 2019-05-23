import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route,Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import NotFound from './components/not_found';
import Login from './components/login';
import Main from './components/main';
import AlbumView from './components/album-view';
import ArtistView from './components/artist-view';

import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore); 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
    <BrowserRouter>
        <div className='root-div'>
            <Switch>
                <Route path={'/album/:id'} render={(obj) => (<Main subpage="albumPage" thisMatch={obj}/>)}/>
                <Route path={'/album'}/>
                <Route path={'/song/:id'}/>
                <Route path={'/song'}/>
                <Route path={'/user/:id'}/>
                <Route path={'/artist/:id'} render={(obj) => (<Main subpage="artistPage" thisMatch={obj}/>)}/>
                <Route path={'/user'}/>
                <Route path={'/home/account'} render={(props) => (<Main subpage="account"/>)}/>
                <Route path={'/home/admin'} render={(props) => (<Main subpage="admin"/>)}/>
                <Route path={'/home/admin2'} render={(props) => (<Main subpage="admin2"/>)}/>
                <Route path={'/home/admin3'} render={(props) => (<Main subpage="admin3"/>)}/>
                <Route path={'/home/artist'} render={(props) => (<Main subpage="artist"/>)}/>
                <Route path={'/home/songs'} render={(props) => (<Main subpage="songs"/>)}/>
                <Route path={'/home/albums'} render={(props) => (<Main subpage="albums"/>)}/>
                <Route path={'/home/artists'} render={(props) => (<Main subpage="artists"/>)}/>
                <Route path={'/home/playlists'} render={(props) => (<Main subpage="playlists"/>)}/>
                <Route path={'/home'} component={Main}/>
                <Route path={'/logout'} render={(props) => (<Login startState="logout"/>)}/>/>
                <Route path={'/'} component={Login}/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));


