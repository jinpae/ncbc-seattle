import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';

import styles from './giving.module.scss';

export const GivingPageTemplate = ({ title, content }) => (
  <Page title="Giving" className={styles.component}>
    <Helmet title={`${title} | Giving`} />
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  </Page>
);

const GivingPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title },
    html
  } = page;

  return <GivingPageTemplate title={title} content={html} />;
};

GivingPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GivingPage;

export const givingPageQuery = graphql`
  query GivingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
