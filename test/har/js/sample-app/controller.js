define(function() {
  return {
    editContact: function(contact) {
      this._updateForm(this._form, contact);
    },
    logModel: function(model) {
      return console.log("MODEL:", model);
    }
  };
});
