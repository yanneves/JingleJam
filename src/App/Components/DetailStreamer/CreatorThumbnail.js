import React from 'react'
import StreamerDetails from './StreamerDetails'
import { Stream } from 'stream';
import { thisExpression } from '@babel/types';

export default class CreatorThumbnail extends React.Component 
{

    render(){
        const yog = this.props.yog;
        const onSelectYog = this.props.onSelectYog;

        return(
            <div onClick={() => onSelectYog(yog)}>
            <img className="creatorThumbnail" src={yog.profilePicture} alt={`${yog} profile`}/>
            </div>
        );
        
    }
}