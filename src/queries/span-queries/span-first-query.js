'use strict';

const isNil = require('lodash.isnil');

const { util: { checkType } } = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Matches spans near the beginning of a field. The span first query maps to Lucene `SpanFirstQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-first-query.html)
 *
 * @example
 * const spanQry = bob.spanFirstQuery()
 *  .match(bob.spanTermQuery('user', 'kimchy'))
 *  .end(3);
 *
 * @extends SpanQueryBase
 */
class SpanFirstQuery extends SpanQueryBase {
    /**
     * Creates an instance of `SpanFirstQuery`
     *
     * @param {SpanQueryBase} spanQry Any other span type query
     */
    constructor(spanQry) {
        super('span_first');

        if (!isNil(spanQry)) this.match(spanQry);
    }

    /**
     * Sets the `match` clause which can be any other span type query.
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanFirstQuery} returns `this` so that calls can be chained.
     */
    match(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.match = spanQry;
        return this;
    }

    /**
     * Sets the maximum end position permitted in a match.
     *
     * @param {number} limit The maximum end position permitted in a match.
     * @returns {SpanFirstQuery} returns `this` so that calls can be chained.
     */
    end(limit) {
        this._queryOpts.end = limit;
        return this;
    }
}

module.exports = SpanFirstQuery;