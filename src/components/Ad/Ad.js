import React, { Component } from "react";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { ad } = this.props
        return (
            <div className="ad">
                <span>
                    {ad.startTime}
                </span>
                <span>
                    {ad.evt.type === "IMAGE" ? "IMG" : "VID"}
                </span>
                <span>
                    {ad.evt.creative.name}
                </span>
                <span>
                    <a href={ad.evt.creative.url}>link</a>
                </span>
            </div>
        );
    }
}

export default History;