import React from 'react';

import styles from './DirectionsButton.module.scss';

const DIRECTION_URL =
  'https://www.google.com/maps/dir/?api=1&destination=14054+Wallingford+Ave+N,+Seattle,+WA+98133';

const DirectionsButton = () => (
  <a
    className={styles.component}
    href={DIRECTION_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    Get Directions
  </a>
);

export default DirectionsButton;
