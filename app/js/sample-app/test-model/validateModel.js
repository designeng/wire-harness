define(function() {
  var validateModel;
  return validateModel = function(contact) {
    var result, valid;
    valid = void 0;
    result = void 0;
    result = {
      valid: true,
      errors: []
    };
    valid = contact && 'firstName' in contact && contact.firstName.trim();
    if (!valid) {
      result.valid = false;
      result.errors.push({
        property: 'firstName',
        message: 'missing'
      });
    }
    console.log("result----->", result);
    return result;
  };
});
