import React, { PureComponent } from "react";
import "./App.css";
import axios from "axios";
import { API_BASE } from "./constants";

import Form, { FormFields } from "./Form";

interface AppProps {}
interface AppState {
  shortLink: string | null;
}

class App extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      shortLink: null
    };
  }

  onSubmit = (s: FormFields) => {
    axios
      .post(`${API_BASE}/links`, {
        fullLink: s.fullLink
      })
      .then(response => {
        this.setState({
          shortLink: `${API_BASE}/${response.data.id}`
        });
      })
      .catch(() => {
        alert("something went wrong, try again later");
      });
  };

  get shortLink() {
    if (!this.state.shortLink) {
      return null;
    }

    return (
      <div className="linkWrapper">
        Your short link:{" "}
        <a href={this.state.shortLink}>{this.state.shortLink}</a>
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <h1 className="title">Awesome link shortener</h1>

          <Form onSubmit={this.onSubmit} />

          {this.shortLink}
        </div>
      </div>
    );
  }
}

export default App;
