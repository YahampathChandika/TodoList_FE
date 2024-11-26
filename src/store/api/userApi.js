import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => {
        return {
          url: "users/register",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useAddUserMutation } = userApi;
