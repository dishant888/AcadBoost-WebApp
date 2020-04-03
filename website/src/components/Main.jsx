import React, { Component } from "react";
import Home from "../pages/Home/Home";
import Blog from "../pages/Blog/Blog";
import Courses from "../pages/Courses/Courses";
import VideoPlayer from '../pages/VideoPlayer/VideoPlayer'
import Media from '../pages/Media/Media'
import Detail from '../pages/Courses/Detail';
import Auth from '../pages/Auth/Auth'
import FAQ from '../staticPages/FAQ';
import { Route,Switch } from "react-router-dom";

class Main extends Component {

  state = {
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

  render() {
    return (
      <div className="container-fluid" style={{ minHeight: '100vh' }}> {/*Add this if navbar position fixed marginTop:'60px',*/}
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses"> <Courses data={this.state.CourseState} /> </Route>
          <Route exact path="/auth" > <Auth/> </Route>
          <Route exact path="/course/:id" render={props => <Detail course_id={props.match.params.id} data={this.state} />} />
          {/* <Route exact path="/watch_video/:id" render={props => <VideoPlayer video_id={props.match.params.id} history={props.history} data={props.location.state} />} /> */}
          <Route exact path="/watch_video/:id" render={props => <Media video_id={props.match.params.id} data={props.location.state} />} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/FAQs" component={FAQ} />
        </Switch>
      </div>
    );
  }
}

export default Main;
