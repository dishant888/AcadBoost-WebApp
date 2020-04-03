import React from 'react';
import {Link} from 'react-router-dom';
import './style.css'


const getOtherVideRow = data => {

    const {allVideos} = data
    const {id: current_video_id} = data.video
    const otherVideos = allVideos.filter(v => v.id !== current_video_id)

    if(otherVideos.length === 0) {
        return (
            <center>
                <p>
                    No Videos
                </p>
            </center>
        )
    }

    return (
        otherVideos.map(video => {
            return (
                <Link
                    to={{
                        pathname: '/watch_video/' + video.id,
                        state: {
                            video: video,
                            allVideos: allVideos
                        }
                    }}
                    className="video-row-link">
                    <div key={video.id} className="row">
                        <div className="col-12 video-row">
                            <span className="ml-3 material-icons mr-3">
                                ondemand_video
                            </span>
                            {video.title}
                        </div>
                    </div>
                </Link>
            )
        })
    )
}

const getSelectedVideo = data => {
    return (
        <video style={{ width: '100%' }} controls autoplay name="media" controlsList="nodownload">
            <source src={data.video.object_url} type="video/mp4" />
        </video>
    )
}

const getOtherVideos = data => {
    return (
        <React.Fragment>
            <p>
                More Videos
            </p>
            <hr />
            <div className="row">
                <div className="col-12">
                    {getOtherVideRow(data)}
                </div>
            </div>
        </React.Fragment>
    )
}

const result = ({data,history}) => {
    return (
        <React.Fragment>
            <div className="col-lg-8 col-12 text-md-left text-center">
                <a onClick={() => { history.goBack() }} >
                    <span class="back-btn material-icons">arrow_back_ios</span>
                </a>
                {getSelectedVideo(data)}
            </div>
            <div className="col-lg-4 col-12">
                {getOtherVideos(data)}
            </div>
        </React.Fragment>
    )
}

const VideoPlayer = (props) => {
    return ( 
    <div className="row">{result(props)}</div>
     )
}
 
export default VideoPlayer;