import React, { Component } from "react";
import History from "../History/History";
import { adDispatcher } from 'ubimo-fed-home-assigment';
import ReactPlayer from "react-player";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: []
        };
    }

    componentDidMount() {
        adDispatcher.adEvents$
            .subscribe((evt) => {
                this.setState({ ads: [...this.state.ads, { evt, startTime: new Date().getTime(), endTime: new Date().getTime() + 5, show: true }] })
            })
    }

    render() {
        return (
            <div className="main">
                <div className="listAdd">
                    <History ads={this.state.ads} />
                </div>
                <div className="map">
                    {this.state.ads.map(ad => {
                        return (
                            <div style={{ position: "absolute", top: `${ad.evt.coordinates.y}px`, left: `${ad.evt.coordinates.x}px` }}>
                                {
                                    ad.evt.type === "IMAGE" ?
                                        <img alt={ad.evt.creative.name} src={ad.evt.creative.url} width="80px" height="80px" />
                                        :
                                        <ReactPlayer url={ad.evt.creative.url} width="100px" height="100px" muted playing/>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Main;
