import React, { Component } from "react";
import Ad from "../Ad/Ad";
var _ = require('lodash');

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            endTime: null,
            list: [],
            listSort: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.ads && prevProps.ads && !_.isEqual(this.props.ads, prevProps.ads)) {
            let adsSort = this.props.ads
            if (this.state.startTime || this.state.endTime) {
                adsSort = adsSort.filter(ad => {
                    return (this.state.startTime && ad.startTime > this.state.startTime) || (this.state.endTime && ad.endTime < this.state.endTime)
                })
            }
            this.setState({ list: this.props.ads, listSort: adsSort })
        }
        if (!_.isEqual(this.state.startTime, prevState.startTime) || !_.isEqual(this.state.endTime, prevState.endTime)) {
            const adsFilter = this.state.list.filter(ad => {
                if (this.state.startTime || this.state.endTime)
                    return (this.state.startTime && ad.startTime > this.state.startTime) || (this.state.endTime && ad.endTime < this.state.endTime)
                else return true
            })
            this.setState({ list: adsFilter })
        }
        else { this.state.startTime === "" && this.state.endTime === "" && this.setState({ listSort: this.state.list })}
    }

    render() {
        return (
            <div>
                <h1> Ads </h1>
                <div>
                    <input
                        placeholder="Enter start time"
                        onChange={(e) => { this.setState({ startTime: e.target.value }) }}
                    ></input>
                    <input
                        placeholder="Enter end time"
                        onChange={e => this.setState({ endTime: e.target.value })}
                    ></input>
                </div>
                <div>
                    {this.state.listSort && this.state.listSort.map(ad => <Ad ad={ad} />)}
                </div>
            </div>
        );
    }
}

export default History;