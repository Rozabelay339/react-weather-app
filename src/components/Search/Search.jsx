import { useRef } from 'react';
import styles from './Search.module.css';

const Search = ({ setCurrentCity }) => {
  const textVal = useRef();

  const handleOnChange = () => {
    setCurrentCity(textVal.current.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        ref={textVal}
        placeholder="Search for city"
      />
      <button onClick={handleOnChange}>Search</button>
    </div>
  );
};

export default Search;
