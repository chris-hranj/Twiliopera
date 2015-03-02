var Midi = require('jsmidgen')
  , fs = require('fs')

module.exports = function (digits, instrument, callback) {
  var l = digits.length;
  var file = new Midi.File();
  var track = new Midi.Track();
  file.addTrack(track);

  //log instrument to ensure correct instrument is being chosen
  console.log(instrument);

  // setInstrument uses hex values to make selection
  switch (instrument) { 
    case 'piano':
      track.setInstrument(0, 0x01);
      break;
    case 'guitar': 
      track.setInstrument(0, 0x19);
      break;
    case 'sax': 
      track.setInstrument(0, 0x41);
      break;
    case 'square': 
      track.setInstrument(0, 0x51);
      break;
  }

  // actual conversion of numpad input into music notes
  // occurs here.
  for (var i = 0; i < l; i++) {
    switch (digits[i]) { 
      case '1': 
        track.addNote(0, 'c4', 64);
        break;
      case '2':
        track.addNote(0, 'd4', 64);
        break
      case '3':
        track.addNote(0, 'e4', 64);
        break;
      case '4':
        track.addNote(0, 'f4', 64);
        break;
      case '5':
        track.addNote(0, 'g4', 64);
        break;
      case '6': 
        track.addNote(0, 'a4', 64);
        break;
      case '7':
        track.addNote(0, 'b4', 64);
        break;
      case '8': 
        track.addNote(0, 'c5', 64);
        break;
      case '9':
        track.addNote(0, 'd5', 64);
        break;
      case '*': 
        track.addNote(0, 'e5', 64);
        break;
      case '0':
        track.addNote(0, 'f5', 64);
        break;
      case '#': 
        track.addNote(0, 'g5', 64);
        break;
    }
  }

  fs.writeFile('./public/output.mid', file.toBytes(), 'binary', function (err) { 
    if (err) {
      console.log('err : ' + err);
      callback(err);
    } else {
      callback();
    }
  })
}
