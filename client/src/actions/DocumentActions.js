import superagent from 'superagent';
import { ActionTypes } from '../constants';

/**
 * createDocument - Creates a new document.
 * @param {String} token - A token for this document's author.
 * @param {String} title - The title of the new document.
 * @param {String} content - The content of the new document.
 * @param {String} access - The access type of the new document.
 * @param {String} categories - The categories of the new document.
 * @param {String} tags - The tags of the new document.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document creation process (commencement, success
 * or failure).
 */
export function createDocument(token, title, content, access, categories,
  tags) {
  return (dispatch, getState, httpClient) => {
    dispatch({ type: ActionTypes.CREATE_DOCUMENT_PENDING });
    const newDocument = {
      title,
      content,
      access,
      categories,
      tags
    };

    const request = httpClient || superagent;

    request
      .post('/api/documents')
      .send(newDocument)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.CREATE_DOCUMENT_REJECTED,
            payload: err.response.body
          });
          return;
        }

        dispatch({
          type: ActionTypes.CREATE_DOCUMENT_FULFILLED,
          payload: res.body
        });
      });
  };
}

/**
 * fetchAllDocuments - Fetches all documents.
 * @param {String} token - A token for the user making the request.
 * @param {String} limit - Number of documents to return per request.
 * @param {String} offset - Number of documents to skip before
 * beginning the fetch.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document fetching process (commencement, success
 * or failure).
 */
export function fetchAllDocuments(token, limit, offset) {
  return (dispatch, getState, httpClient) => {
    dispatch({ type: ActionTypes.FETCH_ALL_DOCUMENTS_PENDING });

    const request = httpClient || superagent;

    request
      .get(`/api/documents?limit=${limit}&offset=${offset}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.FETCH_ALL_DOCUMENTS_REJECTED,
            payload: err.response.body
          });
          return;
        }

        dispatch({
          type: ActionTypes.FETCH_ALL_DOCUMENTS_FULFILLED,
          payload: res.body
        });
      });
  };
}

/**
 * fetchUserDocuments - Fetches the documents that belong to a user.
 * @param {String} token - A token for the user making the request.
 * @param {Number} targetUserId - The id of the user whose documents are
 * to be fetched.
 * @param {String} limit - Number of documents to return per request.
 * @param {String} offset - Number of documents to skip before
 * beginning the fetch.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document fetching process (commencement, success
 * or failure).
 */
export function fetchUserDocuments(token, targetUserId, limit, offset) {
  return (dispatch, getState, httpClient) => {
    dispatch({ type: ActionTypes.FETCH_USER_DOCUMENTS_PENDING });

    const request = httpClient || superagent;

    request
      .get(`/api/users/${targetUserId}/documents?limit=${limit}&offset=${offset}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.FETCH_USER_DOCUMENTS_REJECTED,
            payload: err.response.body
          });
          return;
        }

        dispatch({
          type: ActionTypes.FETCH_USER_DOCUMENTS_FULFILLED,
          payload: res.body
        });
      });
  };
}

/**
 * deleteDocument - Deletes a document.
 * @param {String} token - A token for the user making the request.
 * @param {String} targetDocumentId - The id of the document to be deleted.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the deletion process (commencement, success or failure).
 */
export function deleteDocument(token, targetDocumentId) {
  return (dispatch, getState, httpClient) => {
    dispatch({
      type: ActionTypes.DELETE_DOCUMENT_PENDING,
      payload: {
        targetDocumentId
      }
    });

    const request = httpClient || superagent;

    request
      .delete(`/api/documents/${targetDocumentId}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.DELETE_DOCUMENT_REJECTED,
            payload: {
              targetDocumentId,
              ...err.response.body
            }
          });
          return;
        }

        dispatch({
          type: ActionTypes.DELETE_DOCUMENT_FULFILLED,
          payload: res.body
        });
      });
  };
}

/**
 * updateDocument - Updates document.
 * @param {String} token - A token for this document's author.
 * @param {Number} targetDocumentId - The id of the document to update.
 * @param {Object} updateInfo - Info about the fields of the document which
 * are to be updated.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document creation process (commencement, success
 * or failure).
 */
export function updateDocument(token, targetDocumentId, updateInfo) {
  return (dispatch, getState, httpClient) => {
    dispatch({
      type: ActionTypes.UPDATE_DOCUMENT_PENDING,
      payload: {
        targetDocumentId
      }
    });

    const request = httpClient || superagent;

    request
      .put(`/api/documents/${targetDocumentId}`)
      .send(updateInfo)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.UPDATE_DOCUMENT_REJECTED,
            payload: {
              targetDocumentId,
              ...err.response.body
            }
          });
          return;
        }

        dispatch({
          type: ActionTypes.UPDATE_DOCUMENT_FULFILLED,
          payload: res.body
        });
      });
  };
}

/**
 * getDocument - Retrieves a specific document.
 * @param {String} token - A token for this document's author.
 * @param {Number} targetDocumentId - The id of the document to retrieve.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the retrieval process (commencement, success
 * or failure).
 */
export function getDocument(token, targetDocumentId) {
  return (dispatch, getState, httpClient) => {
    dispatch({
      type: ActionTypes.GET_DOCUMENT_PENDING
    });

    const request = httpClient || superagent;

    request
      .get(`/api/documents/${targetDocumentId}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: ActionTypes.GET_DOCUMENT_REJECTED,
            payload: err.response.body
          });
          return;
        }

        dispatch({
          type: ActionTypes.GET_DOCUMENT_FULFILLED,
          payload: res.body
        });
      });
  };
}
