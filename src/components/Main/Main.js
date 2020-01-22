import React, { Component } from "react";
import History from "../History/History";
import { adDispatcher } from 'ubimo-fed-home-assigment';
import ReactPlayer from "react-player";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            id: 0,
            intervalId: null
        };
    }

    componentDidMount() {
        const id = this.state.id
        adDispatcher.adEvents$
            .subscribe((evt) => {
                this.setState({
                    ads: [...this.state.ads, { evt, id: id, startTime: new Date().getTime(), endTime: new Date().getTime() + 5, show: true }],
                    id: id + 1,
                    intervalId: setInterval(() => this.setShow(id), 5000)
                })
            })
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId)
      }

    setShow = (id) => {
        this.setState({
            ads: this.state.ads.map(ad => (ad.id === id ? { ...ad, show: false } : ad))
        });
    }

    render() {
        return (
            <div className="main">
                <div className="listAdd">
                    <History ads={this.state.ads.sort((a, b) => b.startTime - a.startTime)} />
                </div>
                <div className="map">
                    {this.state.ads.map(ad => {
                        if (ad.show) {
                            return (
                                <div style={{ position: "absolute", top: `${ad.evt.coordinates.y}px`, left: `${ad.evt.coordinates.x}px` }}>
                                    {
                                        ad.evt.type === "IMAGE" ?
                                            <img alt={ad.evt.creative.name} src={ad.evt.creative.url} width="80px" height="80px" />
                                            :
                                            <ReactPlayer url={ad.evt.creative.url} width="100px" height="100px" muted playing />
                                    }
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Main;
