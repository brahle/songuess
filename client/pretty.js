/*jslint indent: 2, plusplus: true*/
/*globals myClock, $, ColorAssigner*/
"use strict";

var pretty = {
  t0 : null,
  colorStyle : (function () {
    var colorAssigner = new ColorAssigner();

    return function (id) {
      return colorAssigner.colorForId(id);
    };
  }()),
  leadingZero : function (number, num) {
    var sol = number.toString();
    if (num === undefined) {
      num = 2;
    }
    while (sol.length < num) {
      sol = "0" + sol;
    }
    return sol;
  },
  relativeTime : function (songStarts) {
    if (!songStarts) {
      pretty.t0 = null;
    } else {
      pretty.t0 = songStarts;
    }
  },
  timeInterval : function (ms) {
    var sol = (Math.round(ms) / 1000).toString();
    if (ms >= 0) {
      sol = "+" + sol;
    }
    if (sol.indexOf('.') === -1) {
      sol = sol + '.';
    }
    while (sol.length < 5) {
      sol = sol + "0";
    }
    while (sol.length > 5) {
      sol = sol.substr(0, sol.length - 1);
    }
    if (sol.substr(-1) === ".") {
      sol = "+ " + sol.substr(1, sol.length - 2);
    }
    return sol;
  },
  delimit : function (flag) {
    if (!flag) {
      flag = "|";
    }
    return $("<span>")
      .addClass("time")
      .html("&nbsp;&nbsp;&nbsp;&nbsp;" + flag)[0]
      .outerHTML;
  },
  playTime : function (offset) {
    return $("<span>")
      .addClass("time")
      .html(pretty.timeInterval(offset))[0]
      .outerHTML;
  },
  text : function (info, css_class) {
    return $("<span>")
      .addClass(css_class)
      .text(info)[0]
      .outerHTML;
  },
  song : function (song) {
    return '"' + pretty.text(song.title, "bold") + '"';
  },
  rowMessage : function (row) {
    if (row === 5) {
      return " in killing spree!";
    }
    if (row === 10) {
      return " on a rampage!";
    }
    if (row === 15) {
      return " dominating!!!";
    }
    if (row === 20) {
      return " UNSTOPPABLE!";
    }
    if (row === 25) {
      return " G O D L I K E ! ! 1";
    }
  },
  clientWithScore : function (client) {
    return $("<div>")
      .addClass("full-client")
      .attr('id', client.id)
      .css({color: pretty.colorStyle(client.id)})
      .text(client.nsdisp)
      .append($("<span>").text(client.score))[0]
      .outerHTML;
  },
  client : function (client) {
    return $("<span>")
      .addClass("full-client")
      .css({color: pretty.colorStyle(client.id)})
      .text(client.nsdisp)[0]
      .outerHTML;
  }
};

