import * as types from "../actions/types";
import initialState from "./initialState";

export default function blog(state = initialState.blog, action) {
  switch (action.type) {
    case types.BLOG_LIST:
      return {
        ...state,
        blogList: action.data
    };
    case types.BLOG_DETAIL:
      return {
        ...state,
        blogDetail: action.data
    };
    default:
      return state;
  }
}