// important it have to have function decoration not arrow function or function expression

module.exports = {
    transformObj: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        // console.log(doc)
        // console.log(ret)
        // console.log(options)
    }
};
