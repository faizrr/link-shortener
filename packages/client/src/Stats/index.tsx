import React, { PureComponent } from "react";
import axios from "axios";
import "./index.css";
import { API_BASE } from "../constants";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

interface StatsProps {}
interface StatsState {
  createdLinks: number;
  linksVisits: number;
  lastCreatedLinkTime: Date | null;
}

class Stats extends PureComponent<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);
    this.state = {
      createdLinks: 0,
      linksVisits: 0,
      lastCreatedLinkTime: null
    };
  }

  updateStats = () => {
    axios.get(`${API_BASE}/links/stats`).then(response => {
      this.setState({
        createdLinks: response.data.createdLinks,
        linksVisits: response.data.linksVisits,
        lastCreatedLinkTime: new Date(response.data.lastCreatedLinkTime)
      });
    });
  };

  componentDidMount() {
    this.updateStats();

    setInterval(() => {
      this.updateStats();
    }, 5000);
  }

  render() {
    return (
      <div className="stats">
        Created links: {this.state.createdLinks} | Links visits:{" "}
        {this.state.linksVisits} | Last created link:{" "}
        {this.state.lastCreatedLinkTime
          ? distanceInWordsToNow(this.state.lastCreatedLinkTime, {
              addSuffix: true
            })
          : ""}
      </div>
    );
  }
}

export default Stats;
