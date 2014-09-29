/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable(
    'notes', {
      id: {
        type: 'int',
        primaryKey: true
      },
      body: 'string',
      nick: 'string',
      createdAt: {
        type: 'datetime',
        defaultValue: 'now'
      }
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('notes', callback);
};
