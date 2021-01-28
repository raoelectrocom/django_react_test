import React, { Component } from 'react';

import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { createBlog } from "../../redux/actions/blog"

class BlogCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            post: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.createBlog = this.createBlog.bind(this);
    }

  handleChange(event) {
      const { name, value } = event.target;
      this.setState({[name]: value });
  }

  createBlog = () => {
    this.props.createBlog(this.state.title, this.state.post)
    this.props.history.push("/blog-detail");
  }

  render () {
    return (
      <>
        <h1>Blog detail</h1>
        <form onSubmit={this.createBlog}>
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
  }
}

const mapDispatchToProps = {
    createBlog,
};

export default connect(null, mapDispatchToProps)(BlogCreate);