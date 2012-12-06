(function () {
  'use strict';

  function start_extra_modules (content_node) {

    if (!(content_node.firstElementChild)) return;

    var names = content_node.firstElementChild.getAttribute('data-extra-scripts');

    if (!names) return;

    names = names.split(/\s+/).map(function (name) {
      if (name) {
        this[name].start();
      }
    }.bind(this));
  }

  this.start_extra_modules = start_extra_modules;

}).call(ns('szywon'));
