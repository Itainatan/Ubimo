import React, { Component } from "react";
import History from "../History/History";
import { adDispatcher } from 'ubimo-fed-home-assigment';

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
                console.log(evt)
                this.setState({ ads: [...this.state.ads, evt] })
            })
    }

    render() {
        return (
            <div className="main">
                <div className="listAdd">
                    <History />
                </div>
                <div className="map">
                    {this.state.ads.map(ad => {
                        return (
                            <div style={{ position: "absolute", top: `${ad.coordinates.y}px`, left: `${ad.coordinates.x}px` }}>
                                {
                                    ad.type === "IMAGE" ?
                                        <img alt="a" src={ad.creative.url} width="400px" height="400px" />
                                        :
                                        <iframe title="aa" src={ad.creative.url} width="400px" height="400px" />
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
