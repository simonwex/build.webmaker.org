/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var note = require('../models/note');

module.exports = function(client){
  // Listen for joins
  client.addListener("join", function(channel, who) {
    // Welcome them in!
    client.say(channel, who + "...dude...welcome back!");
  });
}
