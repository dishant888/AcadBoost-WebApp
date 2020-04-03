import React, { Component } from 'react';
import Courses from '../pages/Courses/Courses'
import User from '../pages/Users/Users'
import Settings from '../pages/Settings/Settings'
import Detail from '../pages/Courses/Detail';
import {Switch,Route } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 

          CourseState: {
            loading: true,
            courses: []
          },
          SubjectState: {
            loading: true,
            subjects: []
          },
          VideoState: {
            loading: true,
            videos: []
          }

         }
    }

  componentDidMount() {
    this.fetchCourses()
    this.fetchSubjects()
    this.fetchVideos()
  }

  fetchCourses = () => {
    const url = "http://localhost:3030/course"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          CourseState: {
            loading: false,
            courses: [...data]
          }
        })
      })
  }

  fetchSubjects = () => {
    const url = "http://localhost:3030/subject"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          SubjectState: {
            loading: false,
            subjects: [...data]
          }
        })
      })
  }

  fetchVideos = () => {
    const url = "http://localhost:3030/video"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          VideoState: {
            loading: false,
            videos: [...data]
          }
        })
      })
  }

  handleChange = e => {
    const {course_id,name,value} = e.target
    
  }

    render() { 
        return (
          <div className="container-fluid">
            <br />
              <Switch>
                <Route exact path={'/app'}>
                  <Courses data={this.state.CourseState} />
                </Route>
                <Route exact path="/app/courses/:id" render={props => <Detail course_id={props.match.params.id} onChange={(e)=>this.handleChange(e)} data={this.state} />} />
                <Route exact path="/app/users" component={User} />
                <Route exact path="/app/settings" component={Settings} />
              </Switch>
          </div>
        );
    }
}
 
export default Main;