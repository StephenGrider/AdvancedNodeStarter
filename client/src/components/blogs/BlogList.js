import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderImage({ file }) {
    if (file) {
      return (
        <div className="card-image">
          <img src={file} />
        </div>
      );
    }
  }

  renderBlogs() {
    return this.props.blogs.reverse().map(blog => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          {this.renderImage(blog)}

          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
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
