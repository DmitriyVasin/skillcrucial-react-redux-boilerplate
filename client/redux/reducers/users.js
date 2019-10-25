const GET_DATA = 'skillcrucial/users/GET_DATA'
const ERROR_HAPENNED = 'skillcrucial/users/ERROR_HAPENNED'
const REQUEST_DONE = 'skillcrucial/users/REQUEST_DONE'
const REQUEST_STARTED = 'skillcrucial/users/REQUEST_STARTED'

const initialState = {
  list: [],
  isRequesting: false,
  total: 0,
  maxPage: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isRequesting: true
      }
    case GET_DATA:
      return {
        ...state,
        list: action.list,
        total: action.total,
        maxPage: action.maxPage
      }
    case REQUEST_DONE:
      return {
        ...state,
        isRequesting: false
      }
    default:
      return state
  }
}

export function getData(pageIndex) {
  return (dispatch) => {
    dispatch({ type: REQUEST_STARTED })
    return fetch(`/api/users/${pageIndex}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: GET_DATA,
          list: json.data,
          total: json.total,
          maxPage: json.maxPage
        })
        dispatch({ type: REQUEST_DONE })
      })
      .catch((err) => {
        dispatch({
          type: ERROR_HAPENNED,
          err
        })
        dispatch({ type: REQUEST_DONE })
      })
  }
}
