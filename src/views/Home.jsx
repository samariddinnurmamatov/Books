import { useState, useEffect } from 'react';
import axios from '../services/AuthService';
import ModalComponent from '../components/ui/Modal';
import Book from '../components/bookcard/bookcard';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isbn, setIsbn] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Modal yopilganda input tozalansin
    setIsbn('');
  };

  const createBook = (newBook) => {
    getBooks();
    setBooks((prevBooks) => {
      if (!prevBooks) return [newBook];
      return [...prevBooks, newBook];
    });
    setErrorMessage(true);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/books');
      setBooks(res.data?.data || []);
    } catch (e) {
      console.log(e);
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`/books/${bookId}`);
      setBooks((prevBooks) =>
        prevBooks?.filter((book) => book.book.id !== bookId) || []
      );
      setErrorMessage(true);
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  };

  useEffect(() => {
    if (errorMessage === true) {
      let timerId = setTimeout(() => {
        setErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [errorMessage]);

  return (
    <div className="py-10">
      <div className="flex justify-between">
        <div className="text-white">
          <h1 className="text-[30px] mb-2">You’ve got <span style={{color: "#6200EE"}}>7 book</span></h1>
          <p>Your books today</p>
        </div>
        <div>
          <button className="text-white px-4 py-2 rounded-lg" style={{background: "#6200EE"}} onClick={handleOpen}>+ Create a book</button>
        </div>
      </div>
      <div className="py-10 flex gap-5">
        {books &&
            books.map((book) => (
            <Book
              key={book.book?.id}
              book={book.book}
              deleteBook={deleteBook}
            />
        ))}
      </div>
      <ModalComponent 
        open={open} 
        handleClose={handleClose} 
        createBook={createBook}
        isbn={isbn} // isbn ni prop sifatida o'tkazamiz
        setIsbn={setIsbn} // setIsbn funktsiyasini prop sifatida o'tkazamiz
      />
    </div>
  );
};

export default Home;
