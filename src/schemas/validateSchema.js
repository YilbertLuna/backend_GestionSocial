import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({
    required_error: "username is required"}
  ).max(20,
    {message: "username must be at las 20 characters"}
  ),
  password: z.string({
    required_error: "password is required"
  }).max(40,
    {message: "password must be at las 40 characters"}
  )
})