// "use client"

// import type React from "react"

// import { useState } from "react"


// interface AuthModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function AuthModal({ isOpen, onClose }: AuthModalProps) {
//   const [isSignUp, setIsSignUp] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [name, setName] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission here
//     console.log(isSignUp ? "Sign up" : "Sign in", { email, password, name })
//   }

//   const handleGoogleAuth = () => {
//     // Handle Google authentication here
//     console.log("Google auth")
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
//         <div className="p-8 space-y-6">
//           {/* Header */}
//           <div className="space-y-2 text-center">
//             <h2 className="text-2xl font-semibold text-card-foreground">
//               {isSignUp ? "Create your account" : "Login to your account"}
//             </h2>
//             <p className="text-muted-foreground text-sm">
//               {isSignUp
//                 ? "Enter your details below to create your account"
//                 : "Enter your email below to login to your account"}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name field - only for sign up */}
//             {isSignUp && (
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-card-foreground font-medium">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="bg-input border-border text-card-foreground placeholder:text-muted-foreground"
//                   required={isSignUp}
//                 />
//               </div>
//             )}

//             {/* Email field */}
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-card-foreground font-medium">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="bg-input border-border text-card-foreground placeholder:text-muted-foreground"
//                 required
//               />
//             </div>

//             {/* Password field */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="text-card-foreground font-medium">
//                   Password
//                 </label>
//                 {!isSignUp && (
//                   <button
//                     type="button"
//                     className="text-sm text-muted-foreground hover:text-card-foreground transition-colors"
//                   >
//                     Forgot your password?
//                   </button>
//                 )}
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="bg-input border-border text-card-foreground"
//                 required
//               />
//             </div>

//             {/* Confirm Password field - only for sign up */}
//             {isSignUp && (
//               <div className="space-y-2">
//                 <label htmlFor="confirmPassword" className="text-card-foreground font-medium">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="bg-input border-border text-card-foreground"
//                   required={isSignUp}
//                 />
//               </div>
//             )}

//             {/* Submit Button */}
//             <button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
//               {isSignUp ? "Sign up" : "Login"}
//             </Button>
//           </form>

//           {/* Google Button */}
//           <button
//             type="button"
//             variant="outline"
//             onClick={handleGoogleAuth}
//             className="w-full bg-transparent border-border text-card-foreground hover:bg-accent hover:text-accent-foreground"
//           >
//             {isSignUp ? "Sign up with Google" : "Login with Google"}
//           </button>

//           {/* Toggle between sign in and sign up */}
//           <div className="text-center text-sm text-muted-foreground">
//             {isSignUp ? "Already have an account? " : "Don't have an account? "}
//             <button
//               type="button"
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="text-card-foreground hover:underline font-medium"
//             >
//               {isSignUp ? "Sign in" : "Sign up"}
//             </button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
