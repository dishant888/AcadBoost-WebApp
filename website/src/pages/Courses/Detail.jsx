import React from 'react';
import './detail.css'
import {Link} from 'react-router-dom'

const getDescription = description => {
    return (<p dangerouslySetInnerHTML={{ __html: description }}></p>)
}

const getContent = (props) => {
    const { SubjectState } = props.data
    const { course_id } = props
    const {subjects : allSubjects,loading} = SubjectState
    const subjects = allSubjects.filter(s => course_id === s.course_id)

    if (loading) {
        return (
            <center>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </center>
        )
    }

    if (subjects.length === 0) {
        return (
            <center>
                <p>No Data Available</p>
            </center>
        )
    }

    return (
        subjects.map((subject, i) => {
            const html_id = makeId(i + 1)
            return (
                <div key={subject.id}>
                    <a data-toggle="collapse" className="subject-row-link" href={"#" + html_id}>
                        {getSubjectRow(subject)}
                    </a>
                    <div className="collapse" id={html_id}>
                        <div className="col-12">
                            {getVideos(subject.id,props.data.VideoState)}
                        </div>
                    </div>
                </div>
            )
        })
    )
}

const getVideos = (subject_id,data) => {
    const {loading,videos : allVideos} = data
    const videos = allVideos.filter(v => subject_id === v.subject_id)

    if (loading) {
        return (
            <center>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </center>
        )
    }

    if (videos.length === 0) {
        return (
            <center>
                <p>No Data Available</p>
            </center>
        )
    }

    return (
        videos.map(video => {
            return (
                <Link 
                    key={video.id}
                    to={{
                        pathname: '/watch_video/' + video.id,
                        state: {
                            video: video,
                            allVideos: videos
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

const getSubjectRow = s => {
    return (
        <div className="row">
            <div className="col-12 subject-row" style={{ display: 'inherit' }}>
                <i className="material-icons">
                    label_important
                </i>
                <span className="ml-4 mr-2">
                    {
                        s.description ? s.name + ': ' + s.description : s.name
                    }
                </span>
            </div>
        </div>
    )
}

const makeId = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const result = props => {
    const course_id = props.course_id
    const courses = [...props.data.CourseState.courses]
    const course = courses.filter(c => course_id === c.id)
    const data = {...course[0]}

    return (
        <div className="col-lg-12">
            {/* <hr style={{ marginTop: '0px', marginBottom: '20px', border: '0.5px solid #ccc' }} /> */}
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2">
                    <img src={data.image_url} className="img-responsive rounded" alt="image" width="100%" height="auto" />
                </div>
                <div className="col-lg-8 col-md-6 p-md-0 pt-3">
                    <h4>{data.title}</h4>
                    <p style={{ marginBottom: '0px', color: 'darkgrey' }} className="text-md-left text-center">Learn from AIR 1 himself :D</p>
                    <div className="card-items">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Instructor: <b>{data.course_by}</b></li>
                            <li className="list-group-item">Language: <b>{data.language}</b></li>
                            <li className="list-group-item">Validity: <b>{data.validity}</b></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" id="content-tab" data-toggle="tab" href="#content" role="tab" aria-controls="content" aria-selected="false">Content</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="How-To-Use-tab" data-toggle="tab" href="#How-To-Use" role="tab" aria-controls="How-To-Use" aria-selected="false">How to use</a>
                        </li>
                    </ul>
                    <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade" id="description" role="tabpanel" aria-labelledby="description-tab">{getDescription(data.description)}</div>
                        <div className="tab-pane fade show active" id="content" role="tabpanel" aria-labelledby="content-tab">{getContent(props)}</div>
                        <div className="tab-pane fade" id="How-To-Use" role="tabpanel" aria-labelledby="How-To-Use-tab">
                            <p>After successful purchase, this item would be added to your courses.</p>
                            <br />
                            <p>You can access your courses in the following ways :</p>
                            <br />
                            <ul>
                                <li>From Computer, you can access your courses after successful login</li>
                                <li>For other devices, you can access your library using this web app through browser of your device.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Detail = (props) => {
    // console.log(props)
    return (
        <div className="row">
            {result(props)}
        </div>
    )
}
 
export default Detail;