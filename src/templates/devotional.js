import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Page from '../components/Page/Page';
import Headphones from '../img/svg/headphones.svg';

import styles from './devotional.module.scss';

const ESV_API_URL = `https://api.esv.org/v3/passage/`;
const ESV_AUDIO_URL = 'https://audio.esv.org/hw/';
const ESV_API_KEY = process.env.GATSBY_ESV_API_KEY;
const DAY = 60 * 60 * 24 * 1000;

const SkeletonElement = ({ children, type, ...rest }) => {
  return React.createElement(type, { ...rest }, children);
};

const SkeletonScreen = () => (
  <article className={styles.article}>
    <div className={styles.titleWrapper}>
      <SkeletonElement className={`${styles.articleTitleSkeleton}`} type="h2" />
    </div>
    <SkeletonElement
      className={`${styles.paragraphSkeleton} ${styles.date}`}
      type="p"
    />
    <div className={styles.articleContent}>
      <SkeletonElement className={`${styles.subTitleSkeleton}`} type="h3" />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.long}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.medium}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.long}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.medium}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.short}`}
        type="p"
      />
      <SkeletonElement className={`${styles.subTitleSkeleton}`} type="h3" />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.medium}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.medium}`}
        type="p"
      />
      <SkeletonElement
        className={`${styles.paragraphSkeleton} ${styles.short}`}
        type="p"
      />
    </div>
  </article>
);

export class DevotionalPageTemplate extends React.Component {
  state = {
    passage: '',
    text: '',
    loading: true
  };

  static defaultProps = {
    date: new Date()
  };

  componentDidMount() {
    this.fetchDevotionalText();
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.fetchDevotionalText();
    }
  }

  fetchDevotionalText() {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    fetch(this.props.passagesUrl)
      .then(response => response.json())
      .then(passages => {
        const { date } = this.props;
        const passagesForCurrentMonth = passages[date.getMonth()];
        const passage = passagesForCurrentMonth[date.getDate() - 1];

        return this.queryAPI(
          `html/?q=${passage}&include-passage-references=false`
        ).then(({ passages: text }) => {
          this.setState({
            passage,
            text
          });
        });
      })
      .catch(error => console.warn('Error', error.message))
      .finally(() => this.setState({ loading: false }));
  }

  queryAPI(endpoint) {
    const url = `${ESV_API_URL}${endpoint}`;
    const options = {
      headers: {
        Authorization: `Token ${ESV_API_KEY}`
      }
    };

    return fetch(url, options).then(
      response => (response.ok ? response.json() : Promise.reject(response))
    );
  }

  render() {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    const { passage, text, loading } = this.state;
    const { date } = this.props;

    return (
      <Page title="Daily Devotion" className={styles.component}>
        <Helmet title={`${this.props.title} | Daily Devotion`} />
        {loading ? (
          <SkeletonScreen />
        ) : (
          <article className={styles.article}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.articleTitle}>{passage}</h2>
              <a
                href={`${ESV_AUDIO_URL}${encodeURIComponent(passage)}.mp3`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.audioLink}
              >
                <Headphones className={styles.headphones} />
              </a>
            </div>
            <p className={styles.date}>
              {date.toLocaleDateString('en-US', options)}
            </p>
            <div className={styles.articleContent}>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
            <div className={styles.guideline}>
              <h2>Daily Devotion Guideline</h2>
              <div className={styles.articleContent}>
                <ol>
                  <li>Start with a prayer asking God to speak to you through the passage.</li>
                  <li>Read today’s passage until you are familiar with the story or the principal points of the text.</li>
                  <li>Try picking out a key verse of the passage and giving your own title to the text that in your opinion best summarizes the main point.</li>
                  <li>Try answering the question “Who is God/Jesus like?” from today’s passage.</li>
                  <li>Prayerfully try to answer “What lesson is God teaching me from today’s devotion?”</li>
                  <li>End with a prayer of thanksgiving and asking God “How can I apply today’s teachings?”</li>
                </ol>
              </div>
            </div>
            <div className={styles.passageNav}>
              <Link
                rel="prev"
                to={{
                  pathname: '/devotional/',
                  state: {
                    date: new Date(date.getTime() - DAY)
                  }
                }}
              >
                ← Previous
              </Link>
              <Link
                rel="next"
                to={{
                  pathname: '/devotional/',
                  state: {
                    date: new Date(date.getTime() + DAY)
                  }
                }}
              >
                Next →
              </Link>
            </div>
          </article>
        )}
      </Page>
    );
  }
}

class DevotionalPage extends React.Component {
  state = {
    date: new Date()
  };

  componentDidUpdate(prevProps) {
    const { state: currentState } = this.props.location;
    const { state: prevState } = prevProps.location;

    if (currentState !== prevState) {
      const date = (currentState && currentState.date) || new Date();
      this.setState({ date: date });
    }
  }

  render() {
    const { markdownRemark: page } = this.props.data;
    const {
      frontmatter: { title, passagesUrl }
    } = page;
    const { date } = this.state;

    return (
      <DevotionalPageTemplate
        title={title}
        passagesUrl={passagesUrl}
        date={date}
      />
    );
  }
}

DevotionalPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default DevotionalPage;

export const devotionalPageQuery = graphql`
  query DevotionalPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        passagesUrl
      }
    }
  }
`;
