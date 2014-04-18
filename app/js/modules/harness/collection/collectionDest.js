define(['cola/dom/adapter/NodeList', 'cola/dom/adapter/Node', 'jquery'], function(NodeListAdapter, NodeAdapter, $) {
  var dest, getNode, querySelector;
  getNode = function(selector) {
    return $(selector);
  };
  querySelector = function(selector, node) {
    return node.find(selector);
  };
  dest = new NodeListAdapter(getNode('.sidebar'), {
    querySelector: querySelector,
    bindings: {
      first: {
        node: '.first'
      },
      last: {
        node: '.last'
      }
    }
  });
  return dest;
});
