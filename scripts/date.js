// Short Function to correct date fo articles 
function makeDate (){
    var d = new Date();
    var formattedDate = "";
    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();
    return formattedDate;
};
// Export makeDate function
module.exports = makeDate