import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// keepUnusedDataFor: is an attribute which is set to 60 seconds by default by rtk query 
// which cache the data locally for a default of 60 seconds so if you make the same 
// request within 60 seconds it will provide you with the same cahced data and to modify
// this we can add keepUnusedDataFor in our builder.query

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URI,
        credentials: "include"
    }),
    tagTypes: ['Todo'], 
    endpoints: (builder) => ({
        home:builder.query({
            query: () => ''
        }),
        todo: builder.query({
            query: () => `/getTodos`,
            providesTags: ['Todo'],
            keepUnusedDataFor: 10
        }),
        createTodo: builder.mutation({
            query: (payload) => ({
                url: '/createTodo',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Todo']
        }),
        editTodoTitle: builder.mutation({
            query: ({id,payload}) => ({
                url: `/editTodoTitle/?id=${id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/deleteTodo/?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        }),
        createTask: builder.mutation({
            query: ({ id, payload}) => ({
                url: `/createTask/?id=${id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTask: builder.mutation({
            query: ({id, payload}) => ({
                url: `/deleteTask/?id=${id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Todo']
        }),
        editTask: builder.mutation({
            query: ({id,payload}) => ({
                url: `/editTask/?id=${id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useHomeQuery, 
    useTodoQuery,
    useCreateTodoMutation,
    useEditTodoTitleMutation,
    useDeleteTodoMutation,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation
} = todoApi;