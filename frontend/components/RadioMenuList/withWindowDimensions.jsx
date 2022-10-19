// Credit: taken from https://stackoverflow.com/a/53623366/7756989

import React, { Component } from "react";

export default function withWindowDimensions(WrappedComponent) {
    return class extends Component {
        state = { width: 0, height: 0 };

        componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener("resize", this.updateWindowDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWindowDimensions);
        }

        updateWindowDimensions = () => {
            this.setState({ width: window.innerWidth, height: window.innerHeight });
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    windowWidth={this.state.width}
                    windowHeight={this.state.height}
                    isMobileSized={this.state.width < 700}
                />
            );
        }
    };
}
