const format = require('date-fns/format')

function formattedDate(date) {
    return format(date, "dd-MM-yyyy' Pukul 'HH:mm");
}

module.exports = { 
    formattedDate 
};