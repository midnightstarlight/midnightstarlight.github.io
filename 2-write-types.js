ndef.write({
  records: [
    { recordType:"text", data:"Hello World" },
    { recordType:"url", data:"https://code-boxx.com/" },
    { recordType:"url", data:"sms:12345678" },
    { recordType:"url", data:"tel:12345678" },
    { recordType:"url", data:"mailto:jon@doe.com?subject=Title&body=Body" },
    { recordType:"url", data:"geo:35.698723,139.772639" },
    { recordType:"empty" }
  ]
})
.then(() => nfc.logger("Write OK"))
.catch(err => nfc.logger("ERROR - " + err.message));