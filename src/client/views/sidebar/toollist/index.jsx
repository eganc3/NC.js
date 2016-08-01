import React from 'react';
import _ from 'lodash';

export default class ToolList extends React.Component {
  constructor(props) {
    super(props);

    this.renderNode = this.renderNode.bind(this);
  }

  renderNode(node) {
    let cName = 'node';
    if (node.id === this.props.curtool) {
      cName += ' running-node';
    }
    if (node.enabled === false) {
      cName += ' disabled';
    }

    return (
      <ol
        id={node.id}
        type = {node.toolType}
        className={cName}
        onClick={() => this.props.propertyCb(node)}
        onMouseDown={function(e) {
          e.stopPropagation();
          return false;
        }}
        style={{'paddingLeft': '5px'}}
        key={node.id}
      >
        {node.icon}
        <span className="textbox">{node.name} {node.value}</span>
      </ol>
    );
  }

  render() {

    let treeHeight;
    if(this.props.isMobile)
      treeHeight={"height": "100%"};

    return (
      <div className='m-tree' style={treeHeight}>
        {_.values(this.props.tools).map((tool, i) => {
          return <div className='m-node' key={i}>
            {this.renderNode(tool)}
          </div>;
        })}
      </div>
    );
  }
}

ToolList.propTypes = {
  cbMode: React.PropTypes.func.isRequired,
  cbTree: React.PropTypes.func.isRequired,
};
