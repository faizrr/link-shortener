import React, { PureComponent } from "react";

interface FormProps {
  onSubmit(s: FormFields): void;
}

export interface FormFields {
  fullLink: string;
}

interface FormState extends FormFields {
  isUrl: boolean;
}

const urlRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
);

// TODO: use hooks when 16.8.0 will be stable release
class Form extends PureComponent<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      fullLink: "",
      isUrl: false
    };
  }

  onLinkChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    this.setState({
      fullLink: value,
      isUrl: Boolean(value.match(urlRegex))
    });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!this.state.isUrl) {
      alert("The link is not correct");
      return;
    }

    this.props.onSubmit({
      fullLink: this.state.fullLink
    });
  };

  render() {
    return (
      <form className="inputWrapper" onSubmit={this.onSubmit}>
        <input
          value={this.state.fullLink}
          onChange={this.onLinkChange}
          name="fullLink"
          placeholder="Paste your link here"
        />
        <button type="submit">shorten!</button>
      </form>
    );
  }
}

export default Form;
