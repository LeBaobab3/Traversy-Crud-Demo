const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },

  //two arguments, string and length. We have to specify the length
  //we can change this length depending on what we want it to look like
  //creating a substring and returning a new string with ... at the end
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  //this strips the tags using replace anything with html tags with nothing
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
};
