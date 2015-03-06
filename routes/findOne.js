/**
 * Created by seonaid on 15-03-06.
 */

// This is code from the mongoose query.js file that does the findOne operation on the mongo database

/**
 * Declares the query a findOne operation. When executed, the first found document is passed to the callback.
 *
 * Passing a `callback` executes the query.
 *
 * ####Example
 *
 *     var query  = Kitten.where({ color: 'white' });
 *     query.findOne(function (err, kitten) {
 *       if (err) return handleError(err);
 *       if (kitten) {
 *         // doc may be null if no document matched
 *       }
 *     });
 *
 * @param {Object|Query} [criteria] mongodb selector
 * @param {Function} [callback]
 * @return {Query} this
 * @see findOne http://docs.mongodb.org/manual/reference/method/db.collection.findOne/
 * @api public
 */

Query.prototype.findOne = function (conditions, fields, options, callback) {
    if ('function' == typeof conditions) {
        callback = conditions;
        conditions = null;
        fields = null;
        options = null;
    }

    if ('function' == typeof fields) {
        callback = fields;
        options = null;
        fields = null;
    }

    if ('function' == typeof options) {
        callback = options;
        options = null;
    }

    // make sure we don't send in the whole Document to merge()
    if (conditions instanceof Document) {
        conditions = conditions.toObject();
    }

    if (options) {
        this.setOptions(options);
    }

    if (fields) {
        this.select(fields);
    }

    if (mquery.canMerge(conditions)) {
        this.merge(conditions);
    }

    prepareDiscriminatorCriteria(this);

    try {
        this.cast(this.model);
        this._castError = null;
    } catch (err) {
        this._castError = err;
    }

    if (!callback) {
        // already merged in the conditions, don't need to send them in.
        return Query.base.findOne.call(this);
    }

    var promise = new Promise(callback);

    if (this._castError) {
        promise.error(this._castError);
        return this;
    }

    this._applyPaths();
    this._fields = this._castFields(this._fields);

    var options = this._mongooseOptions;
    var fields = this._fieldsForExec();
    var self = this;

    // don't pass in the conditions because we already merged them in
    Query.base.findOne.call(this, {}, function cb (err, doc) {
        if (err) return promise.error(err);
        if (!doc) return promise.complete(null);

        if (!options.populate) {
            return true === options.lean
                ? promise.complete(doc)
                : completeOne(self.model, doc, fields, self, null, promise);
        }

        var pop = helpers.preparePopulationOptionsMQ(self, options);
        self.model.populate(doc, pop, function (err, doc) {
            if (err) return promise.error(err);

            return true === options.lean
                ? promise.complete(doc)
                : completeOne(self.model, doc, fields, self, pop, promise);
        });
    })

    return this;
}