'use strict';

var React = require('react');
var TextareaAutosize = require('../src/TextareaAutosize');

var Demo = React.createClass({

  render() {
    return (
      <div>
        <div>
          <h2>Component with maxRows and minRows</h2>
          <pre>
{`
  <TextareaAutosize
    minRows={3}
    maxRows={6}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with maxRows</h2>
          <pre>
{`
  <TextareaAutosize
    maxRows={5}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            maxRows={4}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with maxHeight</h2>
          <pre>
{`
  <TextareaAutosize
    style={{maxHeight: 300}}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            style={{maxHeight: 300}}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with rows set</h2>
          <pre>
{`
  <TextareaAutosize
    rows={4}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            rows={4}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Controlled mode</h2>
          <pre>
{`
  <TextareaAutosize
    useCacheForDOMMeasurements
    value={this.state.value}
    onChange={e => this.setState({value: e.target.value})}
    />
`}
          </pre>
          <TextareaAutosize
            useCacheForDOMMeasurements
            value={this.state.value}
            onChange={e => this.setState({value: e.target.value})}
            />
          <button onClick={this.changeValueProgramatically}>
            Change value programatically
          </button>
        </div>
        <div>
          <h2>Uncontrolled mode</h2>
          <pre>
{`
  <TextareaAutosize
    defaultValue={this.state.value}
    />
`}
          </pre>
          <TextareaAutosize
            defaultValue={this.state.value}
            />
        </div>
        <div>
          <h2>Receive message on height change.</h2>
          <pre>
{`
  <TextareaAutosize
    useCacheForDOMMeasurements
    onHeightChange={height => console.log(height)}
    />
`}
          </pre>
          <TextareaAutosize
            useCacheForDOMMeasurements
            onHeightChange={height => console.log(height)}
            />
        </div>
      </div>
    );
  },

  getInitialState() {
    var value = (new Array(15)).join('\nLine.');
    return {value};
  },

  changeValueProgramatically() {
    var value = 'This value was set programatically';
    this.setState({value});
  }
});

React.render(<Demo />, document.getElementById('main'));
