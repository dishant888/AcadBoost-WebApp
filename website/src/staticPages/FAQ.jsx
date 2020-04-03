import React from 'react';
import './style.css'

const FAQ = () => {
    return ( 
        <React.Fragment>
        <div className="row heading">
            <div className="col-12">
                <h1><center>Frequently Asked Question</center></h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>How to create an account?</h2>
                <p>You need to create an account before taking a course. Click on Menu Icon (Three horizontal lines) present on the top left of the Store Screen. From the opened menu, click on Login/Register button. Click on Sign Up. Enter your Email Id & Password to register for an account.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>How to use Access Codes?</h2>
                <p>You need to create an account on the app to use the access codes. After Successful login, click on the Menu Icon present on the top left of the Store Screen. From the opened menu, click on My Courses Button. On the opened screen, click on the Gift Icon present on the Top Right of the Screen. Enter your Access Code here. Respective Course will be added to your My Courses section.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>How to take a Course?</h2>
                <p>After you have purchased the Course or used the access code of the course, the course would be added to your My Course Section. Click on the Course image to start the course.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>I have issues with Login, what should I do?</h2>
                <p>You can click on Forgot Password link to reset your password from the login screen. We will send the new password to your registered email address. Try to login with the new password.
                    If the issue still persists, drop an email to acadboost@gmail.com with the issue details.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>I am unable to access the Course, what should I do?</h2>
                <p>Please check whether you are using the same email, which was used for purchasing/using the access code. Check for the course in your My Course section. If the course is still not available, please drop an email to acadboost@gmail.com</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>How to report an issue on the app?</h2>
                <p>For any other issues, please drop an email to acadboost@gmail.com with the complete issue details.</p>
            </div>
        </div>
        </React.Fragment>
     );
}
 
export default FAQ;