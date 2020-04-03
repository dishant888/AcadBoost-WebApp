import React from 'react';
import {Link} from 'react-router-dom';

const footerStyle = {
    width: '100%',
    backgroundColor: '#f8f9fa',
    clear: 'both',
    position: 'relative',
    height: '100px',
    borderTop:'0.5px solid #ccc',
    marginTop: '30px',
    marginBottom: '10px',
    boxShadow: '0px 2px 7px 0.5px rgba(179,170,179,1)'
}

const Footer = () => {
    
    return (  
        <footer style={footerStyle}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Link className="btn btn-link" to="/FAQs">
                            FAQs
                        </Link>
                        <Link className="btn btn-link" to="">
                            About Us
                        </Link>
                        <Link className="btn btn-link" to="">
                            Contact Us
                        </Link>
                        <Link className="btn btn-link" to="">
                            Terms of Use
                        </Link>
                        <Link className="btn btn-link" to="">
                            Privacy Policy
                        </Link>
                        <Link className="btn btn-link" to="">
                            Refund Policy
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p>© 2020 AcadBoost</p>
                    </div>
                </div>
            </div>
        </footer>
      );
}
 
export default Footer;