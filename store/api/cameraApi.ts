import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CameraData,
  CameraListResponse,
  CommonResponse,
  StatusChangePayload,
} from "../interfaces/cameraInterface";

// env added
export const cameraApi = createApi({
  reducerPath: "cameraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process?.env?.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: headers => {
      headers.set("Authorization", `Bearer ${process?.env?.NEXT_PUBLIC_TOKEN}`);
      return headers;
    },
  }),

  endpoints: builder => ({
    getCameraList: builder.query<CameraData[], void>({
      query: () => {
        return {
          url: "/fetch/cameras",
        };
      },
      transformResponse: (res: CameraListResponse) => res.data,
    }),
    changeStatus: builder.mutation<CommonResponse, StatusChangePayload>({
      query: body => {
        return {
          url: "/update/camera/status",
          body,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetCameraListQuery, useChangeStatusMutation } = cameraApi;
