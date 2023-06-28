let date = new Date();
console.log(date)

// const currentDay = date.getDate();
// console.log(currentDay)


// const newDay = currentDay -45;

// Set the new day in the Date object
date.setDate(date.getDate() - 45);

// Print the new date
console.log(date);
