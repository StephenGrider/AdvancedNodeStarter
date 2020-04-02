const mongoose = require('mongoose')

const exec = mongoose.Query.prototype.exec

//using keyword function here because arrow function tries to mess around with the value of this
//inside the function. This is a function assigned to prototype.While *this* should reference the Query being produced
mongoose.Query.prototype.exec = function () {
    console.log('I am about to run a query');
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);
    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    })
    console.log(key)
    return exec.apply(this, arguments)
}