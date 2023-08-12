import { ENV, createPath } from "../utils";

export class Post {
  baseApi = ENV.BASE_API;
  async getPost(page = 1, limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${pageFilter}&${limitFilter}`;
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async createPost(accessToken, data) {
    try {
      const formData = new FormData();
      data.path = createPath(data.title);
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      if (data.file) {
        formData.append("miniature", data.file);
      }
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      } else {
        return result
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePost(accessToken, idPost , data){
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      if (data.file) {
        formData.append("miniature", data.file);
      }
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
      const params ={
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }


  async deletePost(accessToken, idPost){
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) {
        throw result
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async insidePost(path) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${path}`;
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

}
