import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type SearchPostProps = RouteComponentProps;
type State = {
  searchValue: string;
  cls: string;
};

class SearchPost extends React.Component<SearchPostProps, State> {
  state = {
    searchValue: '',
    cls: ''
  };

  getSearchQueryParam(search?: string) {
    const searchParams = new URLSearchParams(
      search || this.props.location.search
    );
    const query = searchParams.get('q');
    return query;
  }

  onKeyPress(event: React.KeyboardEvent) {
    const { key } = event;
    if (key === 'Enter') {
      const { searchValue } = this.state;
      if (searchValue) {
        this.props.history.push(`/?q=${searchValue}`);
      }
    }
  }

  handelOnChange({ target }: React.ChangeEvent) {
    this.setState({
      searchValue: (target as HTMLInputElement).value
    });
  }

  componentDidMount() {
    const searchValue = this.getSearchQueryParam();
    if (searchValue) {
      this.setState({
        searchValue
      });
    }
  }

  componentDidUpdate(props: SearchPostProps) {
    const newQuery = this.getSearchQueryParam();
    const oldQuery = this.getSearchQueryParam(props.location.search);

    if (oldQuery && !newQuery) {
      this.setState({
        searchValue: ''
      });
    }
  }

  render() {
    const { searchValue } = this.state;
    return (
      <input
        value={searchValue}
        type="serach"
        className={`serach-input`}
        placeholder="Search a post"
        onKeyPress={this.onKeyPress.bind(this)}
        onChange={this.handelOnChange.bind(this)}
      />
    );
  }
}

export default SearchPost;
