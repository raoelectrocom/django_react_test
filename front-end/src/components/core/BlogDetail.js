import React, { Component } from 'react';

import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { getBlogDetail, updateBlog } from "../../redux/actions/blog"

class BlogDetail extends Component {

  state = {
    edit: false,
    title: this.props.blogDetail?.title,
    post: this.props.blogDetail?.post
  };
  
  componentDidMount = () => {
    if(!Object.keys(this.props.blogDetail).length){
      this.props.history.push("/")
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value });
  };

  blogEdit = () => {
    debugger
    this.setState({edit: true})
  }

  updateBlog = () => {
    this.props.updateBlog(
      this.props.blogDetail?.id,
      this.state.title, this.state.post
    )
    this.setState({edit: false})
    this.props.history.push("/blog-detail");
  }

  render () {

    let content = ''

    if(this.state.edit){
      content = (
        <>
          <form onSubmit={this.updateBlog}>
            <p>
              <label>
                Title:
              </label>
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <label>
                post:
              </label>
              <CKEditor
                  editor={ ClassicEditor }
                  data={this.state.post}
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      event.target = {
                          name: "post",
                          value: data
                      }
                      this.handleChange(event)
                      console.log( { event, editor, data } );
                  } }
              />
            </p>
            <input type="submit" value="Submit" />
          </form>
        </>
      )

    }else{
      content = (
        <>
          <p>
            <strong>Title:</strong>
            { 
              this.props.blogDetail?.access ?
              <input type="button" value="Edit" onClick={this.blogEdit} />
              : null
            }
          </p>
          <p>{this.props.blogDetail?.title}</p>
          <p><strong>Created at:</strong></p>
          <p>{this.props.blogDetail?.created}</p>
          <p><strong>Last updated at  :</strong></p>
          <p>{this.props.blogDetail?.modified}</p>
          <p><strong>Post:</strong></p>
          { 
            this.props.blogDetail?.post?.length ?
            <div dangerouslySetInnerHTML={{ __html: this.props.blogDetail?.post }} />
            : null
          }
        </>
      )
    }
  
    return (
      <>
        <h1>Blog detail</h1>
        { content }
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    blogDetail: state.blog.blogDetail
  }
}
const mapDispatchToProps = {
  getBlogDetail, updateBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);