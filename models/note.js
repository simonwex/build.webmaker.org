/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var db = require('../lib/db');
var sql = require('sql');


var note = sql.define({
  name: 'notes',
  columns: ['id', 'body', 'nick', 'createdAt']
});

function Note(params){
  this.id = params.id;
  this.body = params.body;
  this.nick = params.nick;
  this.createdAt = params.createdAt;

  this.save = function(cb){
    // var sql =
  }
}

Note.create(params, cb){
  var note = new Note(params);
  note.save(cb);
}

Note.findByNick = function(nick, cb){
  var sql = note
    .select(note.star())
    .from(note)
    .where(
      note.nick.equals(nick)
    )
    .order(note.createdAt).toQuery();

  db.query(sql.text, sql.values, function(err, res){
    if (err){
      // TODO: real logging
      console.log(err);
    }
    var notes = [];
    for (var x in res.rows){
      var note = new Note(res.rows[x]);
      notes.push(note);
    }
    cb(err, notes);
  });
}


module.exports = Note;
