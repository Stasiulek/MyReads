import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(response => {
      console.log(response);
      this.setState({ books: response });
      console.log(response[0].shelf)
      console.log(response[1].shelf)
      console.log(response[2].shelf)
      console.log(response[3].shelf)

    })
    }

  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf name="Currently Reading" books={this.state.books.filter(book => book.shelf === 'currentlyReading')} />
            <Shelf name="Want To Read" books={this.state.books.filter(book => book.shelf === 'wantToReading')} />
            <Shelf name="Read" books={this.state.books.filter(book => book.shelf === 'read')} />
          </div>
        </div>
        {/* <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div> */}
      </div>
    );
  }
}

export default HomePage;