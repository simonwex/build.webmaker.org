#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

require('../lib/util');

var irc = require('irc');

var client = new irc.Client(process.env.IRC_SERVER, process.env.IRC_NICK, {
  channels: process.env.IRC_CHANNELS.split(/\s+/)
});

var notes = require('./notes')(client);
var users = require('./users')(client);

client.addListener('error', function(message) {
  console.log('error: ', message);
});


/*
 * I can't decide if this is cute or dangerous.
 * Here we intercept messages that are directed to the bot. This
 * can happen either in PM or mention
 */
client.addListener('message', function(from, to, message) {
  var talkingToMe = false;
  var command = message;
  if (to === process.env.IRC_NICK) {
    talkingToMe = true;
  }

  if (message.startsWith(process.env.IRC_NICK)) {
    talkingToMe = true;
    command = message.substring(process.env.IRC_NICK.length);
  }

  if (talkingToMe) {
    client.emit('command', command, {from: from, to: to, message: message});
  }
});

// client.addListener('raw', function(message) {
//   console.log('raw: ', message);
// });

module.exports = client;
