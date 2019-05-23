import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class sidebar extends Component{
    render(){
        return(
           <div id='sidebar' className={'list-group'}>
             <div className={'list-group-item text-center'}>
               <img src={'../../images/iconified/152x.png'}/>
             </div>
             <div className={'list-group-item'}>
                 <Link to={'/settings'}>
                     Erlich Bachman
                 </Link>
             </div>
             <div className={'list-group-item'}>
               <Link to={'/home'}>
                 Your Music
               </Link>
             </div>
             <div className={'list-group-item'}>
               <Link to={'/home'}>
                 Friends
               </Link>
             </div>
             <button className="btn btn-large btn-block btn-success" type="button">
               New Playlist
             </button>
           </div>
        );
    }
}

export default sidebar;