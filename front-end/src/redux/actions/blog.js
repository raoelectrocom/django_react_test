import { BLOG_LIST, BLOG_DETAIL } from "./types";
import { blogListAPI, blogDetailAPI, postBlogCreation, putBlogUpdate } from "../../components/api/blogApi";


export function blogListSuccess(data) {
    return { type: BLOG_LIST, data };
}
  
export function getBlogList() {
    return async function (dispatch) {
        try {
            const response = await blogListAPI();
            dispatch(blogListSuccess(response.data));
        } catch (error) {
            console.log("Error obtaining blog list. " + error);
        }
    };
}

export function blogdetailSuccess(data) {
    return { type: BLOG_DETAIL, data };
}

export function getBlogDetail(blog_id) {
    return async function (dispatch) {
        try {
            const response = await blogDetailAPI(blog_id);
            dispatch(blogdetailSuccess(response.data));
        } catch (error) {
            console.log("Error obtaining blog detail. " + error);
        }
    };
}

export function createBlog(title, post) {
    return async function (dispatch) {
        try {
            const response = await postBlogCreation(title, post);
            dispatch(blogdetailSuccess(response.data));
        } catch (error) {
            console.log("Error creating blog. " + error);
        }
    };
}

export function updateBlog(id, title, post) {
    return async function (dispatch) {
        try {
            const response = await putBlogUpdate(id, title, post);
            dispatch(blogdetailSuccess(response.data));
        } catch (error) {
            console.log("Error creating blog. " + error);
        }
    };
}