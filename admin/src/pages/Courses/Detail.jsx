import React, { Component } from 'react';

class Detail extends Component {
    constructor(props) {
        super(props);

        const course_id = this.props.course_id
        const courses = [...this.props.data.CourseState.courses]
        const course = courses.filter(c => course_id === c.id)
        const data = { ...course[0] }

        this.state = { 
            currentState: {
                ...data
            }
         }
    }

    result = () => {
        // const course_id = this.props.course_id
        // const courses = [...this.props.data.CourseState.courses]
        // const course = courses.filter(c => course_id === c.id)
        // const data = { ...course[0] }
        const {currentState : data} = this.state

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2">
                        <img src={data.image_url} className="img-responsive rounded" alt="image" width="100%" height="auto" />
                    </div>
                    <div className="col-lg-8 col-md-6 p-md-0 pt-3">
                        <h4>Title:</h4>
                        <input type="text" name="title" course_id={this.props.course_id} onChange={this.props.onChange} className="form-control" value={ data.title } />
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
                         
                    </div>
                </div>
            </div>
        )
    }

    render() { 
        return ( 
            <div className="row">
                {this.result()}
            </div>
         );
    }
}
 
export default Detail;