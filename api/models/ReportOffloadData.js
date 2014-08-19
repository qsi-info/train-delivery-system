/**
 * ReportOffloadData
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'ReportOffloadData',
	migrate: 'safe',
  autoPK: false,

  attributes: {
  	id: { type: 'string' },
    number: { type: 'string' },
    product: { type: 'string' },
    billOfLading: { type: 'string' },
    netVolBBL: { type: 'float' },
    currentETA: { type: 'datetime' },
    origin: { type: 'string'},
    netVolLTR: { type: 'string' },
    destination: { type: 'string' },
    destinationState: { type: "string" },
    originState: { type: 'string' },
    CLM: { type: 'string' },
    CLMLocation: { type: 'string' },
    record: { type: 'string' },
    adjustedVol: { type: 'string' },
    offloadSTPNetVol: { type: 'string' },
    carrier: { type: 'string' },
    orderNo: { type: 'string' },
    entryType: { type: 'string', defaultsTo: 'ORIG' },
    offloadStatus: { type: 'string' },
    operator: { type: 'string' },
    sourceFileData: { type: 'string' },
    shipDate: { type: 'datetime' },
  }

};
