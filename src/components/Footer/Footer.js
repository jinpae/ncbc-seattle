import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import InstagramIcon from '../../img/svg/instagram.svg';
import EnvelopeIcon from '../../img/svg/envelope.svg';
import Logo from '../../img/svg/box-logo.svg';

import styles from './Footer.module.scss';

const Footer = ({ address, email, phone, instagram, pages }) => {
  const currentYear = new Date().getFullYear();
  const ncbc = 'New Covenant Baptist Church';
  const { name, streetAddress, unit, city, state, zipCode } = address;

  const aboutPages = [];
  const ministriesPages = [];

  pages.forEach(({ node: page }) => {
    if (page.frontmatter.templateKey === 'about') {
      aboutPages.push(page);
    }

    if (page.frontmatter.templateKey === 'ministries') {
      ministriesPages.push(page);
    }
  });

  return (
    <footer className={styles.component}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.leftCol}>
            <div className={styles.brandContainer}>
              <Logo className={styles.logo} />
              <Link className={styles.brand} to="/">
                New Covenant Baptist Church
              </Link>
            </div>
            <address>
              {name && (
                <span>
                  {name} {unit && `(${unit})`}
                </span>
              )}
              <span>
                {streetAddress}, {city}, {state} {zipCode}
              </span>
              <a href={`tel:+1${phone}`}>{phone}</a>
            </address>
            <p className={styles.sbc}>
              NCBC adheres to the Statement of Faith adopted by the{' '}
              <a
                href="http://www.sbc.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Southern Baptist Convention
              </a>
              .
            </p>
          </div>
          <div className={styles.rightCol}>
            <nav className={styles.footerNav}>
              <div className={styles.footerNavCol}>
                <h2 className={styles.footerNavTitle}>About</h2>
                <ul>
                  {aboutPages.map(page => (
                    <li key={page.id}>
                      <Link to={page.fields.slug}>
                        {page.frontmatter.navLinkText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footerNavCol}>
                <h2 className={styles.footerNavTitle}>Ministries</h2>
                <ul>
                  {ministriesPages.map(page => (
                    <li key={page.id}>
                      <Link to={page.fields.slug}>
                        {page.frontmatter.navLinkText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footerNavCol}>
                <ul>
                  <li>
                    <Link to="/devotional" className={styles.footerNavTitle}>
                      Devotional
                    </Link>
                  </li>
                  <li>
                    <Link to="/location" className={styles.footerNavTitle}>
                      Location
                    </Link>
                  </li>
                  <li>
                    <Link to="/giving" className={styles.footerNavTitle}>
                      Giving
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className={styles.socialLinks}>
              <a
                href={`https://www.instagram.com/${instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className={styles.socialLinkIcon} />
              </a>
              <a href={`mailto:${email}`}>
                <EnvelopeIcon className={styles.socialLinkIcon} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            &copy; {currentYear} {ncbc}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  address: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  pages: PropTypes.array
};

export default Footer;
