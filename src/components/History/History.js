import React, { Component } from "react";
import Ad from "../Ad/Ad";
var _ = require('lodash');

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            endTime: null,
            list: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.ads && prevProps.ads && !_.isEqual(this.props.ads, prevProps.ads)) {
            let adsSort = this.props.ads.sort((a, b) => b.startTime - a.startTime)
            if (this.state.startTime || this.state.endTime) {
                adsSort = adsSort.filter(ad => {
                    return (this.state.startTime && ad.startTime > this.state.startTime) || (this.state.endTime && ad.endTime < this.state.endTime)
                })
            }
            this.setState({ list: adsSort })
        }
        if (!_.isEqual(this.state.startTime, prevState.startTime) || !_.isEqual(this.state.endTime, prevState.endTime)) {
            const adsFilter = this.state.list.filter(ad => {
                if (this.state.startTime || this.state.endTime)
                    return (this.state.startTime && ad.startTime > this.state.startTime) || (this.state.endTime && ad.endTime < this.state.endTime)
                else return true
            })
            this.setState({ list: adsFilter })
        }
    }

    render() {
        return (
            <div>
                <h1> Ads </h1>
                <div>
                    <input
                        style={{ margin: "20px" }}
                        placeholder="Enter start time"
                        onChange={(e) => { this.setState({ startTime: e.target.value }) }}
                        value={this.state.email}
                        className="form-control"
                    ></input>
                    <input
                        style={{ margin: "20px" }}
                        placeholder="Enter end time"
                        onChange={e => this.setState({ endTime: e.target.value })}
                        value={this.state.email}
                        className="form-control"
                    ></input>
                </div>
                <div>
                    {this.state.list && this.state.list.map((ad, index) => <Ad ad={ad} />)}
                </div>
            </div>
        );
    }
}

export default History;