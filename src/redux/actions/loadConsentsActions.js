export const GET_CONSENTS_ACTION_TYPES = {
  CONSENTS_FETCH_REQUESTED: 'CONSENTS_FETCH_REQUESTED',
  CONSENTS_FETCH_SUCCEEDED: 'CONSENTS_FETCH_SUCCEEDED',
  CONSENTS_FETCH_FAILED: 'CONSENTS_FETCH_FAILED',
  CONSENTS_FETCH_SERVER_ERROR: 'CONSENTS_FETCH_SERVER_ERROR',
};
export const loadConsents = (payload) => ({
  type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_REQUESTED,
  payload,
});
export const loadConsentsSuccess = (payload) => ({
  type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SUCCEEDED,
  payload,
});

export const loadConsentsFailure = () => ({
  type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_FAILED,
  payload: {},
});

export const loadConsentsServerFailure = () => ({
  type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SERVER_ERROR,
  payload,
});
