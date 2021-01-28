import React, { Component } from 'react';

import { connect } from "react-redux";

import { getBlogList, getBlogDetail } from "../../redux/actions/blog"


class BlogList extends Component {
  
  componentDidMount = () => {
    this.props.getBlogList()
  }

  deatailHandler = (blog_id) => {
    this.props.getBlogDetail(blog_id)
    this.props.history.push("/blog-detail");
  }

  createHandler = () => {
    this.props.history.push("/blog-create");
  }

  render () {
    let blogListJs = this.props.blogList?.map((blog) => (
        <div key={blog.id}>
          <p>
            <strong>{blog?.title}</strong>
            <input type="button" value="detail" onClick={() => this.deatailHandler(blog.id)} />
          </p>
          { blog?.post?.length ?
            <div dangerouslySetInnerHTML={{ __html: blog?.post }} />
            : null
          }
          <hr style={{"width":'50%', textAlign:'left',marginLeft:0}}></hr>
        </div>
      )
    )
    return (
      <>
        <input type="button" value="Create" onClick={() => this.createHandler()} />
        {blogListJs}
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    blogList: state.blog.blogList
  }
}
const mapDispatchToProps = {
  getBlogList, getBlogDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);