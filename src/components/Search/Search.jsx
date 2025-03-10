import styles from './Search.module.css'
import { useRef } from 'react';

const Search = ({ setCurrentCity }) => {
  const textVal = useRef();  // Correct useRef syntax

  const handleClick = () => {
    setCurrentCity(textVal.current.value);  // Update city when search button is clicked
  };

  return (
    <div className={styles.search}>
      <input type="text" ref={textVal} placeholder="Enter city" />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
