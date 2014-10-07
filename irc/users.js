/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var User = require('../models/user');

module.exports = function(client){
  client.addListener('command', function (from, to, message) {
    var talkingToMe = false;

    if (to === process.env.IRC_NICK) {
      talkingToMe = true;
    }

    if (message.startsWith(process.env.IRC_NICK)) {
      talkingToMe = true;
    }

    if (talkingToMe) {
      console.log("they're tlaking to me!");
    }
  });
}
