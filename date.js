module.exports = getDate; //it simply returns the value of function

function getDate() {
    const d = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    let currentDay = d.toLocaleDateString("en-US", options);
    return currentDay;
}
//also we need to save as much as space in there kind of files by using arrow funcs, directly returning values not assigning them variables
//to return more functions we can use module.export.func1 nd module.exports.func2