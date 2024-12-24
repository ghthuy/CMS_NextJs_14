import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: async (body: LoginBodyType) => {
    try {
      const result = await http.post<LoginResType>("/admin/login", body);
      return result; // Ensure the correct result is returned
    } catch (error) {
      console.error("Error in login API:", error);
      throw error; // Re-throw to be handled by the calling function
    }
  },
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  auth: (body: { sessionToken: string; expiresAt: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: async (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    try {
      const result = http.post<MessageResType>(
        "/api/auth/logout",
        {
          force,
        },
        {
          baseUrl: "",
          signal,
        }
      );
      console.log("result", result);
      return result;
    } catch (error) {
      console.error("Error in login API:", error);
      throw error; // Re-throw to be handled by the calling function
    }
  },
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      { baseUrl: "" }
    ),
};

export default authApiRequest;
