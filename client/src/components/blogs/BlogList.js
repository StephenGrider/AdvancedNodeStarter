import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlogs() {
    return this.props.blogs.reverse().map(blog => {
      return (
        <div className="card darken-1" key={blog._id}>
          <div className="card-content">
            <span className="card-title">{blog.title}</span>
            <p>{blog.content}</p>
            <p className="right">
              Sent On: {new Date(blog.dateSent).toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
