import React, {Component} from 'react';


export default class BlockButton extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="block-button">
                <p>
                {this.props.text}
                </p>
            </div>
        );
    }

}