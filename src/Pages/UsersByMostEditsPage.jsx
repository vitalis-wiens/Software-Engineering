import React, { Component } from 'react';
import GraphPage from './GraphPage';
import SimpleBarGraph from '../Components/SimpleBarGraph';
import { getMostEditsUsers } from '../Backend/APIWrapper';

export const UsersByMostEditsGraphSettings = {
  getData: async function() {
    return await getMostEditsUsers();
  },
  refreshTime: 2000,
  refreshMethod: function() {
    this.loadData();
  },
  keys: ['editcount'],
  index: 'name',
  xAxis: 'users',
  yAxis: 'edit count',
  colors: 'paired',
  tooltip: function(click) {
    return this.tooltip(click, 'https://www.wikidata.org/wiki/User:');
  },
};

class UsersByMostEditsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      paused: false,
    };
  }

  handlePause = event => {
    this.setState({ paused: event.target.value });
  };

  render() {
    return (
      <GraphPage
        handlePause={this.handlePause}
        paused={this.state.paused}
        graph={
          <SimpleBarGraph
            fullGraph={true}
            settings={UsersByMostEditsGraphSettings}
            paused={this.state.paused}
          />
        }
        name="Users By Most Edits"
      />
    );
  }
}
export default UsersByMostEditsPage;
