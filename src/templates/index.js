import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import DirectionsButton from '../components/DirectionsButton/DirectionsButton';
import bible from '../img/bible.jpg';

import styles from './index.module.scss';

const IndexPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { main, intro, worshipServiceInfo, keyVerse }
  } = page;

  const {
    heading,
    time,
    location,
    room,
    streetAddress,
    city,
    state,
    zipCode
  } = worshipServiceInfo;

  return (
    <div className={styles.component}>
      <main className={styles.main}>
        <div className={styles.toast}>
          <p>
            Join us in-person worship services at 12:00 PM or {' '}
            <a
              href="https://www.youtube.com/@newcovenantbaptistchurch5257/streams"
              target="_blank"
            >
              online
            </a>!
          </p>
        </div>
        <Header className={styles.header} />
        <div className={styles.mainContent}>
          <h1 className={`${styles.title} ${styles.fadeInDown}`}>
            {main.heading}
          </h1>
          <p className={`${styles.lead} ${styles.fadeInUp}`}>{main.lead}</p>
        </div>
      </main>
      <section id="intro">
        <div className="container">
          <div className={styles.introContent}>
            <h1>{intro.heading}</h1>
            <p>{intro.content}</p>
          </div>
        </div>
      </section>
      <section id="service-info" className={styles.serviceInfo}>
        <div className={`container ${styles.serviceInfoContainer}`}>
          <div className={styles.imageContainer}>
            <img className={styles.serviceInfoImage} src={bible} />
          </div>
          <div className={styles.serviceInfoContent}>
            <h1>{heading}</h1>
            <p>Sundays at {time}</p>
            <p>
              {location}
              <br />
              {room && `(${room})`}
              {room && <br />}
              {streetAddress}
              <br />
              {city}, {state}, {zipCode}
            </p>
            <DirectionsButton />
          </div>
        </div>
      </section>
      <section id="key-verse">
        <div className="container">
          <div className={styles.keyVerseContent}>
            <h1 className={styles.verse}>"{keyVerse.verse}"</h1>
            <p className={styles.reference}>{keyVerse.reference}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        main {
          heading
          lead
        }
        intro {
          heading
          content
        }
        worshipServiceInfo {
          heading
          time
          location
          room
          streetAddress
          city
          state
          zipCode
        }
        keyVerse {
          verse
          reference
        }
      }
    }
  }
`;
