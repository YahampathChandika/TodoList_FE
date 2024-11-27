import { api } from "./api";

export const taskApi = api.injectEndpoints({
  reducerPath: "taskApi",
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (userId) => `todos/${userId}`,
    }),

    getTaskById: builder.query({
      query: (taskId) => `todos/byId/${taskId}`,
    }),

    addTask: builder.mutation({
      query: (taskData) => ({
        url: "todos/",
        method: "POST",
        body: taskData,
      }),
    }),

    updateTask: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    toggleTask: builder.mutation({
      query: (taskId) => ({
        url: `todos/toggle/${taskId}`,
        method: "PATCH",
      }),
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `todos/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
