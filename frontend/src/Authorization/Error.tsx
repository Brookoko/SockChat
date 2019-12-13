import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { LoginError } from '../types';
import './styles/error.css';

const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = (dispatch: {}) => ({});

class ErrorProps {
    constructor(public error?: Error | LoginError) { }
}

class ErrorComponent extends React.Component<ErrorProps> {

    render() {
        const errorMessage = this.props.error ? this.props.error.message : '';

        return (
            <div className="error">
                {errorMessage}
            </div>
        );
    }
}

export const ErrorRenderer = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);