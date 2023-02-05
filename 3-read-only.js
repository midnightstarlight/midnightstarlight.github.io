const ndef = new NDEFReader();
ndef.makeReadOnly()
.then(() => nfc.logger("Tag is now read only."))
.catch(err => nfc.logger("ERROR - " + err.message));