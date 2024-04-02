import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import axios from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid gray',
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    cursor: 'pointer',
    borderRadius: "20px",
    border: "1.8px solid black",
    padding: "3.9px 3.9px"
  },
}));

const ModalComponent = ({ open, handleClose, createBook, isbn, setIsbn }) => {
  const classes = useStyles();

  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    await sendCreate(isbn);
    // Inputni tozalash
    setIsbn('');
  };  

  const sendCreate = async (isbn) => {
    const bookData = JSON.stringify({ isbn });

    try {
      const response = await axios.post("/books", bookData);
      createBook(response.data.data);
      handleClose();
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className='flex items-center justify-between'>
          <h2 id="simple-modal-title" className='text-[18px]'>Create a book</h2>
          <CloseIcon className={classes.closeButton} onClick={handleClose} />
        </div>
        <div className='pt-5'>
          <TextField
            id="isbn"
            label="ISBN"
            variant="outlined"
            fullWidth
            value={isbn} 
            onChange={handleIsbnChange} 
            className="mb-3"
          />
        </div>
        <div className='flex gap-3 pt-5'>
          <button className='w-[100%] py-1.5 rounded-[4px]' style={{border: "1px solid #6200EE", color: "#6200EE"}} onClick={handleClose}>Close</button>
          <button className='w-[100%] py-1.5 rounded-[4px' style={{border: "1px solid #6200EE", background: "#6200EE", color: "white"}} onClick={submit}>Submit</button>
        </div>
      </div>
    </Modal>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  createBook: PropTypes.func.isRequired,
  isbn: PropTypes.string.isRequired,
  setIsbn: PropTypes.func.isRequired
};

export default ModalComponent;
