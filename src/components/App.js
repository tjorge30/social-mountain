import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

//Base URL: practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then( results => {
      this.setState({ posts: results.data })
    .catch(error => console.log(error));
    });
  }

  updatePost() {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
    .then( results => {
      this.setState({ posts: results.data })
    .catch(error => console.log(error));
    });
  }

  deletePost() {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    .then( results => {
      this.setState({ posts: results.data })
    .catch(error => console.log(error));
    });
  }

  createPost() {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then( results => {
      this.setState({ posts: results.data })
    .catch(error => console.log(error));
    });

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {
            posts.map( post => (
              <Post key={ post.id }
                    text={ post.text}
                    date={ post.date }
                    id={ post.id }
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost } />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
