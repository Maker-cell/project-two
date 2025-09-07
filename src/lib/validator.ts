import * as z from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, {
        message: "Names must be at least 3 characters long",
      })
      .nonempty({
        message: "Please enter your First Name",
      }),
    lastName: z
      .string()
      .trim()
      .min(3, {
        message: "Names must be at least 3 characters long",
      })
      .nonempty({
        message: "Please enter your Last Name",
      }),
    email: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/, {
        message: "Please enter a valid email address",
      })
      .nonempty({
        message: "Email is required",
      }),
    phone: z
      .string()
      .trim()
      .regex(/^0[789][01]\d{8}$/, {
        message: "Please enter a valid Nigerian phone number",
      })
      .nonempty({
        message: "Phone Number is required",
      }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/\d/, { message: "Password must contain a number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain a special character",
      })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signupSchema>;

export const forgotPasswordMailSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/, {
      message: "Please enter a valid email address",
    })
    .nonempty({ message: "Email is required" }),
});

export type ForgotPasswordMailFormData = z.infer<
  typeof forgotPasswordMailSchema
>;

export const forgotPasswordPhoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^0[789][01]\d{8}$/, {
      message: "Please enter a valid phone number",
    })
    .nonempty({ message: "Phone Number is required" }),
});

export type ForgotPasswordPhoneFormData = z.infer<
  typeof forgotPasswordPhoneSchema
>;

export const confirmPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/\d/, { message: "Password must contain a number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain a special character",
      })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type confirmPasswordFormData = z.infer<typeof confirmPasswordSchema>;

export type User = {
  email: string;
  password: string;
};
export type UserResponse = {
  users: User[];
};
export const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
