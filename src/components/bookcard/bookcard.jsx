import PropTypes from 'prop-types';

const Book = ({ book, deleteBook }) => {
  return (
    <div>
      <h1>{book?.title}</h1>
      <p>{book?.author}</p>
      <p>{book?.published}</p>
      <p>{book?.isbn}</p>
      <button onClick={() => deleteBook(book.id)}>Delete</button>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default Book;
