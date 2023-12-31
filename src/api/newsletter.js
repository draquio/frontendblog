import { ENV } from "../utils";

export const Newsletterconfig = {
  runtime: 'experimental-edge',
};

export class Newsletter {
  baseApi = ENV.BASE_API;
  async getEmails(accessToken, page = 1, limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
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

  async deleteEmail(accessToken, idEmail) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
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

  async createEmail(email) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      };
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
}
