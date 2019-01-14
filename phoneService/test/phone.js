const {expect} = require('chai');
const sinon = require('sinon');
const models = require('../models');

const phoneCtrl = require('../controllers/phone');
const {
  req,
  phoneList,
  updatedItemsResponse,
  tokenErrorResponse,
  wrongItemCountReq,
  wrongPhoneIdReq,
  wrongPhoneIdErrorResponse,
  wrongItemCountErrorResponse
} = require('../testData/phone');

const wrongRequest = {body:{}};
wrongRequest.body = Object.assign({}, req.body);

req.body.token = require('../config/config').token;
wrongItemCountReq.body.token = require('../config/config').token;
wrongPhoneIdReq.body.token = require('../config/config').token;

describe('check update phones count', () => {
  let stubs;

  before(function () {
    stubs = [
      sinon.stub(models.phone, 'updateItemsCount').callsFake(() => {
        return Promise.resolve();
      }),
      sinon.stub(models.phone, 'findAll').callsFake(() => {
        return Promise.resolve(phoneList);
      })
    ];
  });

  after(function () {
    stubs.forEach((stub) => {
      stub.restore();
    });
  });


  it('should return success', () => {
    return phoneCtrl.updateCounts(req).then((response) => {
      return expect(response).to.deep.equal(updatedItemsResponse);
    })
  });

  it('should return token error', () => {
    return phoneCtrl.updateCounts(wrongRequest).then(() => {
      return Promise.reject('should return token error');
    }).catch((err) => {
      return expect(err).to.deep.equal(tokenErrorResponse);
    })
  });

  it('should return wrong item count error', () => {
    return phoneCtrl.updateCounts(wrongItemCountReq).then(() => {
      return Promise.reject('should return wrong item count error');
    }).catch((err) => {
      return expect(err).to.deep.equal(wrongItemCountErrorResponse);
    })
  });

  it('should return wrong phone id error', () => {
    return phoneCtrl.updateCounts(wrongPhoneIdReq).then(() => {
      return Promise.reject('should return wrong phone id error');
    }).catch((err) => {
      return expect(err).to.deep.equal(wrongPhoneIdErrorResponse);
    })
  });
});