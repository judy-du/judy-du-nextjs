// components/LavaLampBackground.tsx
import React from 'react';
import styles from './LavaLampBackground.module.css';

const LavaLampBackground: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* We'll create multiple blobs */}
      <div className={styles.blob} />
      <div className={styles.blob} />
      <div className={styles.blob} />
    </div>
  );
};

export default LavaLampBackground;
