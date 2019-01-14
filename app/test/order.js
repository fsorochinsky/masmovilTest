const {expect} = require('chai');
const moxios = require('moxios');
const sinon = require('sinon');
const models = require('../models');

const phoneServerUrl = require('../config/config').phoneServerUrl;
const orderCtrl = require('../controllers/order');
const {
  req,
  createdOrderWithItemsResponse,
  phoneList,
  wrongItemCountErrorResponse,
  createdOrderResponse,
  createdOrderItemsResponse,
  orderList,
  foundOrder,
  user,
  createdOrder,
  orderResponse,
  wrongUser,
  wrongUserError
} = require('../testData/order');


describe('check create order', () => {
  describe('create order success', () => {
    let stubs;

    before(function () {
      const originCreateOrderFn = models.order.createOrder;

      stubs = [
        sinon.stub(models.user, 'findOne').callsFake(() => {
          return Promise.resolve(user);
        }),
        sinon.stub(models.orderItem, 'bulkCreate').callsFake(() => {
          return Promise.resolve(createdOrderItemsResponse);
        }),
        sinon.stub(models.order, 'create').callsFake(() => {
          return Promise.resolve(createdOrderResponse);
        }),
        sinon.stub(models.order, 'createOrder').callsFake((order, userId) => {
          let orderWithItems;

          return originCreateOrderFn(order, userId).then((response) => {
            orderWithItems = response;

            return expect(orderWithItems).to.deep.equal(createdOrderWithItemsResponse);
          }).then(() => {
            return Promise.resolve(orderWithItems);
          });
        })
      ];

      moxios.stubRequest(phoneServerUrl + '/updatePhoneCounts', {
        status: 200,
        response: orderResponse
      });

      moxios.install()
    });

    after(function () {
      stubs.forEach((stub) => {
        stub.restore();
      });

      moxios.uninstall()
    });


    it('should return created order with items', () => {
      return orderCtrl.create(req).then((createdOrderResponse) => {
        return expect(createdOrderResponse).to.deep.equal(createdOrder);
      });
    });
  });


  describe('create order fail', () => {
    let stubs;

    before(function () {
      stubs = [
        sinon.stub(models.user, 'findOne').callsFake(() => {
          return Promise.resolve(wrongUser);
        })
      ];
    });

    after(function () {
      stubs.forEach((stub) => {
        stub.restore();
      });
    });


    it('should return wrong uer error', () => {
      return orderCtrl.create(req).then(() => {
        return Promise.reject('should return error');
      }).catch((err) => {
        return expect(err).to.deep.equal(wrongUserError);
      });
    });
  });


  describe('create order fail', () => {
    let stubs;

    before(function () {
      stubs = [
        sinon.stub(models.user, 'findOne').callsFake(() => {
          return Promise.resolve(user);
        })
      ];

      moxios.stubRequest(phoneServerUrl + '/updatePhoneCounts', {
        status: 400,
        response: wrongItemCountErrorResponse
      });

      moxios.install()
    });

    after(function () {
      stubs.forEach((stub) => {
        stub.restore();
      });

      moxios.uninstall()
    });


    it('should return wrong item count error', () => {
      return orderCtrl.create(req).then(() => {
        return Promise.reject('should return error');
      }).catch((err) => {
        expect(err).to.have.nested.property('response.data');

        return expect(err.response.data).to.deep.equal(wrongItemCountErrorResponse);
      });
    });

  });
});


describe('get orders', () => {
  let stubs;

  before(function () {
    stubs = [
      sinon.stub(models.order, 'findAll').callsFake(() => {
        return Promise.resolve(foundOrder);
      })
    ];

    moxios.stubRequest(phoneServerUrl + '/phones', {
      status: 200,
      response: phoneList
    });

    moxios.install()
  });

  after(function () {
    stubs.forEach((stub) => {
      stub.restore();
    });

    moxios.uninstall()
  });


  it('should return order list with user and items', () => {
    return orderCtrl.list(req).then((orders) => {
      return expect(orders).to.deep.equal(orderList);
    })
  });

});