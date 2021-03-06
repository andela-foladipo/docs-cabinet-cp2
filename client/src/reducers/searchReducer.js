import { ActionTypes } from '../constants';

/**
 * Creates a new state that has info about an Action this reducer received.
 * @param {Object} state - the previous state of the store.
 * @param {Object} action - the Action that happened and which needs to
 * be used to update the store.
 * @return {Object} - Returns a new state.
 */
export default function searchReducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ActionTypes.LOGOUT_PENDING:
      newState.users = {
        lastSearchQuery: '',
        lastSearchResultsCount: 0,
        lastSearchResults: []
      };
      newState.documents = {
        lastSearchQuery: '',
        lastSearchResultsCount: 0,
        lastSearchResults: []
      };
      break;

    case ActionTypes.SEARCH_USERS_PENDING:
      newState.status = 'searchingUsers';
      newState.statusMessage = 'Searching... Please wait...';
      break;

    case ActionTypes.SEARCH_USERS_REJECTED:
      newState.status = 'searchUsersFailed';
      newState.statusMessage = action.payload.message || 'Search failed. Please try again.';
      break;

    case ActionTypes.SEARCH_USERS_FULFILLED:
      newState.status = 'searchedUsers';
      newState.statusMessage = action.payload.message || 'Search completed.';
      newState.users = {
        lastSearchQuery: action.payload.query,
        lastSearchResultsCount: action.payload.users.length,
        lastSearchResults: action.payload.users
      };
      break;

    case ActionTypes.SEARCH_DOCUMENTS_PENDING:
      newState.status = 'searchingDocuments';
      newState.statusMessage = 'Searching... Please wait...';
      break;

    case ActionTypes.SEARCH_DOCUMENTS_REJECTED:
      newState.status = 'searchDocumentsFailed';
      newState.statusMessage = action.payload.message || 'Search failed. Please try again.';
      break;

    case ActionTypes.SEARCH_DOCUMENTS_FULFILLED:
      newState.status = 'searchedDocuments';
      newState.statusMessage = action.payload.message || 'Search completed.';
      newState.documents = {
        lastSearchQuery: action.payload.query,
        lastSearchResultsCount: action.payload.documents.length,
        lastSearchResults: action.payload.documents
      };
      break;

    default:
      break;
  }

  if (action.payload !== undefined) {
    if (action.payload.error === 'ExpiredTokenError' ||
      action.payload.error === 'InvalidTokenError') {
      if (action.payload.error === 'ExpiredTokenError') {
        newState.status = 'expiredToken';
      }
      if (action.payload.error === 'InvalidTokenError') {
        newState.status = 'invalidToken';
      }
      newState.users = {
        lastSearchQuery: '',
        lastSearchResultsCount: 0,
        lastSearchResults: []
      };
      newState.documents = {
        lastSearchQuery: '',
        lastSearchResultsCount: 0,
        lastSearchResults: []
      };
    }
  }

  return newState;
}
