import request from 'superagent';

/**
 * createDocument - Creates a new document.
 * @param {String} token - A token for this document's author.
 * @param {String} title - The title of the new document.
 * @param {String} docContent - The content of the new document.
 * @param {String} access - The access type of the new document.
 * @param {String} categories - The categories of the new document.
 * @param {String} tags - The tags of the new document.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document creation process (commencement, success or failure).
 */
export function createDocument(token, title, docContent, access, categories, tags) {
  return (dispatch) => {
    dispatch({ type: 'CREATE_DOCUMENT_PENDING' });
    const newDocument = {
      title,
      docContent,
      access,
      categories,
      tags
    };

    request
      .post('/api/documents')
      .send(newDocument)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: 'CREATE_DOCUMENT_REJECTED',
            payload: { error: err.response.body.error }
          });
          return;
        }
        dispatch({
          type: 'CREATE_DOCUMENT_FULFILLED',
          payload: res.body
        });
      });
  };
}

/**
 * fetchDocuments - Fetches all documents.
 * @param {String} token - A token for the user making the request.
 * @param {String} limit - Number of documents to return per request.
 * @param {String} offset - Number of documents to skip before
 * beginning the fetch.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document fetching process (commencement, success or failure).
 */
export function fetchDocuments(token, limit, offset) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DOCUMENTS_PENDING' });

    request
      .get(`/api/documents?limit=${limit}&offset=${offset}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: 'FETCH_DOCUMENTS_REJECTED',
            payload: { error: err.response.body.error }
          });
          return;
        }
        dispatch({
          type: 'FETCH_DOCUMENTS_FULFILLED',
          payload: res.body
        });
      });
  };
}

/**
 * fetchUserDocuments - Fetches the documents that belong to a user.
 * @param {String} token - A token for the user making the request.
 * @param {Number} userId - The id of the user making the request.
 * @param {String} limit - Number of documents to return per request.
 * @param {String} offset - Number of documents to skip before
 * beginning the fetch.
 * @return {Function} - Returns a function that dispatches actions based
 * on the state of the document fetching process (commencement, success or failure).
 */
export function fetchUserDocuments(token, userId, limit, offset) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_DOCUMENTS_PENDING' });

    request
      .get(`/api/users/${userId}/documents?limit=${limit}&offset=${offset}`)
      .set('Accept', 'application/json')
      .set('x-docs-cabinet-authentication', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: 'FETCH_USER_DOCUMENTS_REJECTED',
            payload: { error: err.response.body.error }
          });
          return;
        }
        dispatch({
          type: 'FETCH_USER_DOCUMENTS_FULFILLED',
          payload: res.body
        });
      });
  };
}

export function updateDocument() {
  
}