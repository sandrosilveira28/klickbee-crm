"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(false)
  const {data: session} = useSession()
  const router = useRouter()

  if(session?.user) {
    router.push("/")
  }
  // Validation schema
  const SignupSchema = Yup.object().shape({
    name: isSignUp
      ? Yup.string().required("Full name is required")
      : Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: isSignUp
      ? Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm your password")
      : Yup.string(),
  })

  // Form submission
  const handleSubmit = async (values: any) => {
    if (isSignUp) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        })
      } else {
        alert("Signup failed")
      }
    } else {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      })
    }
  }

  return (
    <div>
      <div className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-card-foreground">
              {isSignUp ? "Create your account" : "Login to your account"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isSignUp
                ? "Enter your details below to create your account"
                : "Enter your email below to login to your account"}
            </p>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Name field (only for sign up) */}
                {isSignUp && (
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-card-foreground font-medium"
                    >
                      Full Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="bg-input border-border text-card-foreground placeholder:text-muted-foreground w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-card-foreground font-medium"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-input border-border text-card-foreground placeholder:text-muted-foreground w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-card-foreground font-medium"
                    >
                      Password
                    </label>
                    {!isSignUp && (
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-card-foreground transition-colors"
                      >
                        Forgot your password?
                      </button>
                    )}
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="bg-input border-border text-card-foreground w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Confirm Password (only for sign up) */}
                {isSignUp && (
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-card-foreground font-medium"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="bg-input border-border text-card-foreground w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSignUp ? "Sign up" : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-transparent border-border text-card-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {isSignUp ? "Sign up with Google" : "Login with Google"}
          </button>

          {/* Toggle Sign in / Sign up */}
          <div className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-card-foreground hover:underline font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
