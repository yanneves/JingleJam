import React from 'react'

class StreamerDetails extends React.Component 
{
    StreamerDetails(props)
    {
        this.state = {
            socialMediaLinks : []
        }
    }

    render() 
    {
        let socialMediaSection = '';

        if(this.props.Yog.socialMedia == undefined)
        {
            socialMediaSection = (
                <h3>Sorry we have no social media for this amazing Yog</h3>
            );
        }else{
            const socialMediaOnYog = this.props.Yog.socialMedia;
            socialMediaSection = (
                    <div>
                        {
                          Object.keys(socialMediaOnYog).map((e, link) => {
                              console.log("event", link);
                              let socialMedia = 'fa fa-' + e;
                         return   <a href={socialMediaOnYog[e]} className={socialMedia}></a>
                          })};
                    </div>
            );
        }

        const Yog = this.props.Yog
        console.log("Yog test:", Yog);
        return(
           <div style={mainBgStyle}>
           <div className="detailTitle">
                <img className="creatorThumbnail yogDetailProfilePic" src={Yog.profilePicture} alt={`${Yog} profile`}/>
                <h2>{Yog.displayName}</h2>
            </div>
                <h3>Social Media Links</h3>
                <ul style={socialMediaIcon}>
                    {socialMediaSection}
                </ul>
           </div> 
        );
    }
}

export default StreamerDetails;

const mainBgStyle = {
    width: 700,
    height: 400, 
    backgroundColor: '#FFF',
    padding: 12,
    color: '#000'
}

const socialMediaIcon = {
    listStyle: 'none',
    paddingLeft: 0
}