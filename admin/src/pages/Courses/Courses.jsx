import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './courses.css'

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    result = () => {
        var style = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: '99999'
        }
        const {loading,courses} = this.props.data
        if (loading) {
            return (
                <div style={style}>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        if (courses.length === 0) {
            return (
                <div style={style}>
                    <div>
                        <h1 className="text-secondary">No Data</h1>
                    </div>
                </div>
            );
        }

        return courses.map(course => {
            return (
                < div key = { course.id } className = "col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 p-lg-3 p-md-2 pb-sm-2 pt-sm-2 p-3" >
                < Link className = "card-link" to = { '/app/courses/' + course.id } >
                    <div className="card">
                        <img
                            className="card-img-top"
                            src={course.image_url}
                            alt="Image"
                        />
                        <div className="card-header">
                            <h5 className="card-title">{course.title}</h5>
                        </div>
                        <div className="card-items">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Instructor: <i>{course.course_by}</i></li>
                                <li className="list-group-item">Language: <i>{course.language}</i></li>
                                <li className="list-group-item">Validity: <i>{course.validity}</i></li>
                            </ul>
                        </div>
                    </div>
                    </Link >
                </div >
            );
        })

    }

    render() { 
        return ( 
            <div className="container">
                <div className="row">
                    {this.result()}
                    < div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 p-lg-3 p-md-2 pb-sm-2 pt-sm-2 p-3" >
                        < Link className="card-link" to={'l'} >
                            <div className="card">
                                <div className="add-course-card-body">
                                    {/* <span className="add-icon"> + </span> */}
                                    <div className="add-text">
                                        Click to add new Course
                                    </div>
                                </div>
                            </div>
                        </Link >
                    </div >
                </div>
            </div>
         );
    }
}
 
export default Courses;