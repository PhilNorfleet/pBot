import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { CounterButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {

  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    const { online } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage} alt="presentation" />
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a
                className={styles.github}
                href="https://github.com/PhilNorfleet/pBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github" /> View on Github
              </a>
            </p>

            <p className={styles.humility}>
              Created and maintained by{' '}
              <a href="https://twitter.com/phil_norfleet" target="_blank" rel="noopener noreferrer">@phil_norfleet</a>.
            </p>
          </div>
        </div>

      </div>
    );
  }
}
