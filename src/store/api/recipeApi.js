import api from "./api";

export const recipeApi = api.injectEndpoints({
  reducerPath: "recipeApi",
  endpoints: (builder) => ({
    getRecipeByCategory: builder.query({
      query: (category) => `recipes/category/${category}`,
    }),

    getRecipeById: builder.query({
      query: (id) => `recipes/${id}`,
    }),
  }),
});

export const { useGetRecipeByCategoryQuery, useGetRecipeByIdQuery } = recipeApi;
