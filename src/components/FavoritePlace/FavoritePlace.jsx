import styles from './FavoritePlace.module.css';

const FavoritePlace = ({ favoriteCities, setCurrentCity }) => {
  if (!favoriteCities || favoriteCities.length === 0) {
    return <p>No favorite places added.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Favorite Places</h2>
      <ul className={styles.list}>
        {favoriteCities.map((city, index) => (
          <li key={index} className={styles.item}>
            <button onClick={() => setCurrentCity(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePlace;
