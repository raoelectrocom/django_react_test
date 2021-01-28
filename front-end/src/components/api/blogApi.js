import axiosAPI from "./axiosApi";

export async function blogListAPI() {
  const response = await axiosAPI.get("blog/");
  return response;
}

export async function blogDetailAPI(blog_id) {
    const response = await axiosAPI.get(`blog/${blog_id}/`);
    return response;
}

export async function postBlogCreation(title, post) {
  const response = await axiosAPI.post("blog/", {
    "title": title,
    "post": post
  });
  return response;
}

export async function putBlogUpdate(id, title, post) {
  const response = await axiosAPI.put(`blog/${id}/`, {
    "title": title,
    "post": post
  });
  return response;
}