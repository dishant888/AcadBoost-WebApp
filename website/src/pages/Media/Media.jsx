import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Media extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentVideo: props.data.video
         }
    }

    getOtherVideRow = data => {

        const { allVideos } = data
        const { id: current_video_id } = data.video
        const otherVideos = allVideos.filter(v => v.id !== current_video_id)

        if (otherVideos.length === 0) {
            return (
                <center>
                    <p>
                        No Videos
                    </p>
                </center>
            )
        }

        return (
            allVideos.map(video => {
                if(video.id === current_video_id) {
                return (
                        <div key={video.id} className="row">
                            <div className="col-12 video-row">
                                <span className="ml-3 material-icons mr-3">
                                    equalizer
                                </span>
                                <div className="w-100">
                                <span>{video.title}</span> 
                                <i className="ml-3">(playing)</i>
                                </div>
                            </div>
                        </div>
                    )
                } 

                return (
                    <Link
                        key={video.id}
                        onClick={() => { this.setState({ currentVideo: video }) }}
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

    getOtherVideos = data => {
        return (
            <React.Fragment>
                <p>
                    More Videos
            </p>
                <hr />
                <div className="row">
                    <div className="col-12">
                        {this.getOtherVideRow(data)}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    getSelectedVideo = () => {
        const {currentVideo: video} = this.state
        return (
            <React.Fragment>
                <video key={video.id} style={{ width: '100%' }} controls autoPlay name="media" controlsList="nodownload">
                    <source src={video.object_url} type="video/mp4" />
                </video>
                <div className="row">
                    <div className="col-12">
                        <h2>{video.title}</h2>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    result = ({data}) => {
        return (
            <React.Fragment>
                <div className="col-lg-8 col-12 text-md-left text-center">
                    {this.getSelectedVideo()}
                </div>
                <div className="col-lg-4 col-12">
                    {this.getOtherVideos(data)}
                </div>
            </React.Fragment>
        )
    }

    render() { 
        return (
            <div className="row">{this.result(this.props)}</div>
        )
    }
}
 
export default Media