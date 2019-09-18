// Short Function to correct date of articles 
function correctDate (){
    var olddate = new Date();
    var newdate = "";
    newdate += (olddate.getMonth() + 1) + "_";
    newdate += olddate.getDate() + "_";
    newdate += olddate.getFullYear();
    return newdate;
};
// Export correct date function
module.exports = correctDate