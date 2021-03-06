import chai from 'chai';
import sinon from 'sinon';
import MockHttpClient from '../../MockHttpClient';
import MockHttpErrorClient from '../../MockHttpErrorClient';
import { ActionTypes } from '../../../constants';
import { deleteUser } from '../../../actions/UserActions';

const expect = chai.expect;

describe('deleteUser', () => {
  it('should dispatch its success actions correctly', () => {
    const token = 'RANDOM_TOKEN';
    const targetUserId = 12;
    const deleteUserActions = deleteUser(token, targetUserId);
    const spy = sinon.spy();
    deleteUserActions(spy, undefined, MockHttpClient);
    expect(spy.calledTwice).to.equal(true);
    expect(spy.calledWith(
      {
        type: ActionTypes.DELETE_USER_PENDING
      }
    )).to.equal(true);
    expect(spy.calledWith(
      {
        type: ActionTypes.DELETE_USER_FULFILLED,
        payload: {
          message: 'Request successful.'
        }
      }
    )).to.equal(true);
  });

  it('should dispatch its failure actions correctly', () => {
    const deleteUserActions = deleteUser();
    const spy = sinon.spy();
    deleteUserActions(spy, undefined, MockHttpErrorClient);
    expect(spy.calledTwice).to.equal(true);
    expect(spy.calledWith(
      {
        type: ActionTypes.DELETE_USER_PENDING
      }
    )).to.equal(true);
    expect(spy.calledWith(
      {
        type: ActionTypes.DELETE_USER_REJECTED,
        payload: {
          message: 'Request failed.'
        }
      }
    )).to.equal(true);
  });
});
