// important it have to have function decoration not arrow function or function expression

module.exports = {
    transformObj: function() {
        const data = this.toObject();
        data.id = data._id;
        delete data._id;
        delete data.__v;
        delete data.password;
        return data;
    }
};
