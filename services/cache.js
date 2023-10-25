const mongoose = require('mongoose')
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = function(){
    return exec.apply(this, arguments)
}