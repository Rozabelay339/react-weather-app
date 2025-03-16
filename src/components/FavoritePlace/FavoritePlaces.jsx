import styles from './FavoritePlaces.module.css';
import { FaHeart, FaTrash } from 'react-icons/fa';

const FavoritePlaces = ({ favorites, setCity, removeFavorite }) => {
  return (
    <div className={styles.container}>
      <h2>Favorite Places</h2>
      {favorites.length === 0 ? (
        <h3>No favorite places saved</h3>
      ) : (
        favorites.map((city, index) => (
          <div key={index} className={styles.favItem}>
            <button onClick={() => setCity(city)} className={styles.favButton}>
              <FaHeart className={styles.heartIcon} /> {city}
            </button>
            <button onClick={() => removeFavorite(city)} className={styles.deleteButton}>
              <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritePlaces;
