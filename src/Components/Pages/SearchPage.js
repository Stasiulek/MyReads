import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book'

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(response => {
      this.setState({ books: response });
      console.log(response);
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query }, this.callSearch);
  }

  callSearch() {
    if (this.state.query === undefined || this.state.query === '') {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(searchResults => {
      console.log(searchResults);
      if (searchResults.error) {
        return this.setState({ results: [] });
      } else {
        searchResults.forEach(booksInResponse => {
          let check = this.state.books.filter(booksInMyCollection => booksInMyCollection.id === booksInResponse.id);
          if (check[0]) { booksInResponse.shelf = check[0].shelf; }
        });
        return this.setState({ results: searchResults });
      }
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(resp => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(bookIterable => bookIterable.id !== book.id).concat([book])
        }));
      });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book moveBook={this.moveBook} book={book} key={key} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;