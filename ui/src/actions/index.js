import axios from 'axios';
import { create } from 'domain';
import _ from 'lodash';
import {callback} from "lodash";

const ROOT_URL='http://localhost:8080/';
export const LOGIN= 'login';
export const FETCH_ALBUMS='fetch_home';
export const FETCH_ARTISTS='fetch_artists';
export const FETCH_ARTIST='fetch_artist';
export const FETCH_ALBUM='fetch_album';
export const FETCH_SONGS='fetch_songs';
export const ACT_LOGIN='act_login';
export const ACT_LOGOUT='act_logout';
export const CHECK_LOGIN='check_login';
export const FETCH_SONGtoPLAY='fetchSongToPlay';
export const FETCH_ALBUMtoPLAY='fetchalbumtoplay';
export const FETCH_USERS='fetch_users';
export const FETCH_USER='fetch_user';
export const ACT_DELUSER='delete_user_2';
export const FETCH_ARTISTS2='fetch_artists2';
export const UPGRADE_USER_ARTIST='upgradeUser2Artist';
export const DOWNGRADE_ARTIST='downgradeArtist'
export const ACT_DELARTIST='actDeleteArtist';
export const UPDATE_USER='update_user';
export const DELETE_USER='delete_user';
export const ACT_DELALBUM='actDeleteAlbum';
export const FETCH_ALBUMS2='fetchAlbums2';
export const FETCH_ALBUM_J='fetch_album_j';
export const RENAME_SONG_J='rename_song_j';
export const RENAME_ARTIST_J='rename_artist_j';
export const UPDATE_ARTIST_BIO_J='update_artist_bio_j';
export const REMOVE_SONG_J='remove_song_j';
export const UPDATE_ALBUM_J='update_album_j';
export const ADD_SONG_J='add_song_j';
export const CHANGE_ARTIST_PROFILE_J='change_artist_profile_j';
export const CREATE_ALBUM_J='create_album_j';
export const CHANGE_SONG_PRIVACY_J='change_song_privacy_j';
export const ADD_CONCERT_J='add_concert_j';
export const UPDATE_CONCERT_J='update_concert_j';
export const REMOVE_CONCERT_J='remove_concert_j';
export const CHANGE_SONG_PENDING_A='change_song_pending_j';
export const REMOVE_SONG_A='remove_song_a';
export const FETCH_ALBUMA='fetch_album_a'
export const ACT_CREATEACCOUNTA='actcreateaccounta'
export const CREATE_ALBUM_A='create_album_a';
export const CHANGE_SONG_PENDING_J='change_song_pending_j';
export const BAN_USER = 'ban_user';

export function login(values,callback){
    const request=axios.post(`${ROOT_URL}/login/`, values).then(()=>callback());
    return {
        type: LOGIN,
        payload:request
    };
}

export function deleteUser(user) {
  const req = axios(`${ROOT_URL}user/delete/`, {
    method: "post",
    data: user,
    withCredentials: true,
  })
  return{
    type:DELETE_USER,
    payload:req
  };
}

export function upgradeUser2Artist(id){
    const idee = {user_to_modify:id};
    const request=axios.post(`${ROOT_URL}/admin/upgradeUserToArtist`, idee);
    return {
        type: UPGRADE_USER_ARTIST,
        payload:request
    };
}
export function updateUser(user) {
  const req = axios(`${ROOT_URL}user/update/`, {
    method: "post",
    data: user,
    withCredentials: true,
  })
  return{
    type:ACT_LOGIN,
    payload:req
  };
}

export function downgradeArtist(id) {
    const idee = {user_to_modify:id};
    const request=axios.post(`${ROOT_URL}/admin/downgradeUserFromArtist`, idee);
    return {
        type: DOWNGRADE_ARTIST,
        payload:request
    };
}


export function checkLogin() {
  const req = axios(`${ROOT_URL}user/checkLogin/`, {
    method: "get",
    withCredentials: true,
  });
  return{
    type:CHECK_LOGIN,
    payload:req
  };
}

export function logUserOut() {
  const req = axios(`${ROOT_URL}user/logout/`, {
    method: "get",
    withCredentials: true,
  })
  return{
    type:ACT_LOGOUT,
    payload:req
  };
}

export function actLogin(credentials) {
  const req = axios(`${ROOT_URL}user/login/`, {
    method: "post",
    data: credentials,
    withCredentials: true,
  });
  return{
    type:ACT_LOGIN,
    payload:req
  };
}

export function actCreateAccount(credentials) {
  const req = axios(`${ROOT_URL}user/register/`, {
    method: "post",
    data: credentials,
    withCredentials: true,
  })
  return{
    type:ACT_LOGIN,
    payload:req
  };
}

export function actCreateAccountA(credentials) {
    const req = axios(`${ROOT_URL}user/registerA/`, {
        method: "post",
        data: credentials,
        withCredentials: true,
    })
    return{
        type:ACT_CREATEACCOUNTA,
        payload:req
    };
}

export function fetchAlbums() {
    const request=axios.get(`${ROOT_URL}album/`, {withCredentials: true});
    return{
        type:FETCH_ALBUMS,
        payload:request
    };
}

export function fetchAlbums2() {
    const request=axios.get(`${ROOT_URL}album/`, {withCredentials: true});
    return{
        type:FETCH_ALBUMS2,
        payload:request
    };
}

export function fetchUsers() {
  const request=axios.get(`${ROOT_URL}user/`, {withCredentials: true});
  return{
    type:FETCH_USERS,
    payload:request
  };
}

export function fetchUser() {
    const request=axios.get(`${ROOT_URL}user/${id}`, {withCredentials: true});
    return{
        type:FETCH_USER,
        payload:request
    };
}

export function fetchArtists() {
  const request=axios.get(`${ROOT_URL}artist/`, {withCredentials: true});
  return{
    type:FETCH_ARTISTS,
    payload:request
  };
}

export function fetchArtists2() {
    const request=axios.get(`${ROOT_URL}artist/`, {withCredentials: true});
    return{
        type:FETCH_ARTISTS2,
        payload:request
    };
}

export function fetchSongs() {
  const request=axios.get(`${ROOT_URL}song/`, {withCredentials: true});
  return{
    type:FETCH_SONGS,
    payload:request
  };
}

export function fetchAlbum(id) {
  const request=axios.get(`${ROOT_URL}album/${id}`, {withCredentials: true});
  return{
    type:FETCH_ALBUM,
    payload:request
  };
}

export function fetchAlbumA(id) {
    const request=axios.get(`${ROOT_URL}album/${id}`, {withCredentials: true});
    return{
        type:FETCH_ALBUMA,
        payload:request
    };
}

export function fetchAlbumJ(id) {
  const request=axios.get(`${ROOT_URL}album/${id}`, {withCredentials: true});
  return{
    type:FETCH_ALBUM_J,
    payload:request
  };
}

export function fetchArtist(id) {
  const request=axios.get(`${ROOT_URL}artist/${id}`, {withCredentials: true});
  return{
    type:FETCH_ARTIST,
    payload:request
  };
}

export function fetchSongToPlay(id) {
  const request=axios.get(`${ROOT_URL}song/${id}`, {withCredentials: true});
  return{
    type:FETCH_SONGtoPLAY,
    payload:request
  };
}

export function fetchAlbumToPlay(id) {
  const request=axios.get(`${ROOT_URL}album/play/${id}`, {withCredentials: true});
  return{
    type:FETCH_ALBUMtoPLAY,
    payload:request
  };
}


export function fetchArtistByUserId(id) {
    const request = axios.get(`${ROOT_URL}artist/user/${id}`, {withCredentials: true});
    return {
        type: FETCH_ARTIST,
        payload: request
    };
}
export function renameSongJ(id,songName) {
  console.log(id);
  const request=axios.post(`${ROOT_URL}song/${id}/renameJ`, {
    method: "post",
    data:songName,
    withCredentials: true,
  });
  return {
    type: RENAME_SONG_J,
    payload:request
  };
}

export function banUser(id) {
    console.log(id);
    const request=axios.post(`${ROOT_URL}user/${id}/ban`, {
        method: "post",
        data:id,
        withCredentials: true,
    });
    return {
        type: BAN_USER,
        payload:request
    };
}

export function renameArtistJ(id,artistName) {
  console.log(id);
  const request=axios.post(`${ROOT_URL}artist/${id}/renameJ`, {
    method: "post",
    data:artistName,
    withCredentials: true,
  });
  return {
    type: RENAME_ARTIST_J,
    payload:request
  };
}
export function updateArtistBioJ(id,bio) {
  const request=axios.post(`${ROOT_URL}artist/${id}/bioJ`, {
    method: "post",
    data:bio,
    withCredentials: true,
  });
  return {
    type: UPDATE_ARTIST_BIO_J,
    payload:request
  };
}
export function removeSongJ(id) {
  const request=axios.post(`${ROOT_URL}song/${id}/removeJ`, {
    method: "post",
    data:id,
    withCredentials: true,
  });
  return {
    type: REMOVE_SONG_J,
    payload:request
  };
}
export function changePrivacyJ(id) {
  const request=axios.post(`${ROOT_URL}song/${id}/privacy`, {
    method: "post",
    data:id,
    withCredentials: true,
  });
  return {
    type: CHANGE_SONG_PRIVACY_J,
    payload:request
  };
}
export function changePendingA(id) {
  const request=axios.post(`${ROOT_URL}song/${id}/pendingA`, {
    method: "post",
    data:id,
    withCredentials: true,
  });
  return {
    type: CHANGE_SONG_PENDING_A,
    payload:request
  };
}
export function addSongJ(file,songName,lyrics,albumId){
  const formData = new FormData();
  var re = /(?:\.([^.]+))?$/;
  var fileName = songName+"."+re.exec(file.name)[1];
  console.log(fileName);
  formData.append('file',file);
  formData.append('songName',songName);
  formData.append('lyrics',lyrics);
  formData.append('fileName',fileName);
  formData.append('albumId',albumId);
  const request=axios.post(`${ROOT_URL}song/addJ`,formData);
  return {
    type: ADD_SONG_J,
    payload:request
  };
}
export function addConcertJ(artistId,date,time,address,description){
  const formData = new FormData();
  formData.append('date',date);
  formData.append('time',time);
  formData.append('address',address);
  formData.append('description',description);
  const request=axios.post(`${ROOT_URL}artist/${artistId}/addConcertJ`,formData);
  return {
    type: ADD_CONCERT_J,
    payload:request
  };
}
export function updateConcertJ(artistId,concertId,date,time,address,description){
  const formData = new FormData();
  formData.append('date',date);
  formData.append('time',time);
  formData.append('address',address);
  formData.append('description',description);
  formData.append('concertId',concertId);
  const request=axios.post(`${ROOT_URL}artist/${artistId}/updateConcertJ`,formData);
  return {
    type: UPDATE_CONCERT_J,
    payload:request
  };
}
export function removeConcertJ(artistId,concertId){
  const formData = new FormData();
  formData.append('concertId',concertId);
  const request=axios.post(`${ROOT_URL}artist/${artistId}/removeConcertJ`,formData);
  return {
    type: REMOVE_CONCERT_J,
    payload:request
  };
}
export function updateAlbumJ(file,albumName,albumId){
  const formData = new FormData();
  var re = /(?:\.([^.]+))?$/;
  var fileName = albumName+"."+re.exec(file.name)[1];
  formData.append('file',file);
  formData.append('albumName',albumName);
  formData.append('fileName',fileName);
  formData.append('albumId',albumId);
  const request=axios.post(`${ROOT_URL}album/updateJ`,formData);
  return {
    type: UPDATE_ALBUM_J,
    payload:request
  };
}
export function createAlbumJ(file,albumName,artistId){
  const formData = new FormData();
  var re = /(?:\.([^.]+))?$/;
  var fileName = albumName+"."+re.exec(file.name)[1];
  formData.append('file',file);
  formData.append('albumName',albumName);
  formData.append('fileName',fileName);
  formData.append('artistId',artistId);
  const request=axios.post(`${ROOT_URL}album/createJ`,formData);
  return {
    type: CREATE_ALBUM_J,
    payload:request
  };
}
export function createAlbumA(file,albumName,artistId){
  const formData = new FormData();
  var re = /(?:\.([^.]+))?$/;
  var fileName = albumName+"."+re.exec(file.name)[1];
  debugger;
  formData.append('file',file);
  formData.append('albumName',albumName);
  formData.append('fileName',fileName);
  formData.append('artistId',artistId);
  const request=axios.post(`${ROOT_URL}album/createA`,formData);
  return {
    type: CREATE_ALBUM_A,
    payload:request
  };
}
export function changeArtistProfileJ(file,artistId,artistName){
  const formData = new FormData();
  var re = /(?:\.([^.]+))?$/;
  var fileName = artistName+"."+re.exec(file.name)[1];
  formData.append('file',file);
  formData.append('fileName',fileName);
  formData.append('artistId',artistId);
  const request=axios.post(`${ROOT_URL}artist/profileJ`,formData);
  return {
    type: CHANGE_ARTIST_PROFILE_J,
    payload:request
  };
}

export function removeSongA(id) {
    const request=axios.post(`${ROOT_URL}song/${id}/removeJ`, {
        method: "post",
        data:id,
        withCredentials: true,
    });
    return {
        type: REMOVE_SONG_A,
        payload:request
    };
}

export function fetchSongJ(id) {
  const request=axios.get(`${ROOT_URL}song/${id}`, {withCredentials: true});
  return{
    type:FETCH_ARTIST,
    payload:request
  };
}
export function actDeleteUser(id) {
  const req = axios(`${ROOT_URL}user/${id}/remove`, {
      method: "post",
      data: id,
      withCredentials: true,
  })
    return{
      type:ACT_DELUSER,
        payload:req
    };
}

export function actDeleteArtist(id) {
    const req = axios(`${ROOT_URL}artist/${id}/removeA?auth=12345`, {
        method: "post",
        data: id,
        withCredentials: true,
    })
    return{
        type:ACT_DELARTIST,
        payload:req
    };
}

export function actDeleteAlbum(id) {
    const req = axios(`${ROOT_URL}album/${id}/remove?auth=12345`, {
        method: "post",
        data: id,
        withCredentials: true,
    })
    return{
        type:ACT_DELALBUM,
        payload:req
    };
}
