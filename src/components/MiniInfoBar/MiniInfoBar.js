import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const MiniInfoBar = ({ time }) => {
  return (
    <div className="mini-info-bar">
      The info bar was last loaded at{' '}
      <span>{time && new Date(time).toString()}</span>
    </div>
  );
}
export default connect(state => ({ time: state.info.data.time }))(MiniInfoBar)
