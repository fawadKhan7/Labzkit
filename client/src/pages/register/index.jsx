import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/users"; 
import PasswordField from "../../components/FormField/PasswordField";
import InputField from "../../components/FormField/InputField";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const response = await registerUser(data);
        if (response) {
          toast.success("Registration Successful");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Registration failed. Please try again!");
        reset();
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, reset]
  );

  return (
    // <Box
    //   sx={{
    //     minHeight: "100vh",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "white",
    //   }}
    // >
    //   <Paper
    //     elevation={6}
    //     sx={{
    //       p: 4,
    //       minHeight: 450,
    //       maxWidth: 400,
    //       width: "100%",
    //       borderRadius: 2,
    //       backgroundColor: "#FFFFFF",
    //       color: "#1C252E",
    //       boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       gap: 3,
    //     }}
    //   >
    //     <Stack spacing={2}>
    //       <Typography
    //         variant="h5"
    //         sx={{ color: "#1C252E", fontWeight: "bold", textAlign: "center" }}
    //       >
    //         Create a new account
    //       </Typography>
    //     </Stack>

    //     {errorMsg && (
    //       <Box
    //         sx={{
    //           mb: 2,
    //           p: 2,
    //           bgcolor: "rgba(255, 0, 0, 0.1)",
    //           color: "#FF5C5C",
    //           borderRadius: 1,
    //         }}
    //       >
    //         {errorMsg}
    //       </Box>
    //     )}

    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Grid container spacing={2}>
    //         <Grid item md={6} xs={12}>
    //           <CustomTextField
    //             name="firstName"
    //             label="First Name"
    //             methods={methods}
    //             error={!!errors.firstName}
    //             helperText={errors.firstName?.message}
    //             sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
    //           />
    //         </Grid>
    //         <Grid item md={6} xs={12}>
    //           <CustomTextField
    //             name="lastName"
    //             label="Last Name"
    //             methods={methods}
    //             error={!!errors.lastName}
    //             helperText={errors.lastName?.message}
    //             sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <CustomTextField
    //             name="email"
    //             label="Email"
    //             methods={methods}
    //             error={!!errors.email}
    //             helperText={errors.email?.message}
    //             sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <CustomTextField
    //             name="password"
    //             label="Password"
    //             type="password"
    //             methods={methods}
    //             error={!!errors.password}
    //             helperText={errors.password?.message}
    //             sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <CustomTextField
    //             name="confirmPassword"
    //             label="Confirm Password"
    //             type="password"
    //             methods={methods}
    //             error={!!errors.confirmPassword}
    //             helperText={errors.confirmPassword?.message}
    //             sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <LoadingButton
    //             fullWidth
    //             size="large"
    //             type="submit"
    //             variant="contained"
    //             loading={isSubmitting}
    //             disabled={isLoading || isSubmitting}
    //             sx={{
    //               backgroundColor: "#00A76F",
    //               color: "#FFFFFF",
    //               "&:hover": {
    //                 backgroundColor: "#007F5B",
    //               },
    //             }}
    //           >
    //             {isLoading ? "Registering..." : "Register"}
    //           </LoadingButton>
    //         </Grid>
    //       </Grid>
    //     </form>

    //     <Typography
    //       align="center"
    //       sx={{
    //         mt: 2,
    //         color: "#1C252E",
    //         fontSize: "0.875rem",
    //       }}
    //     >
    //       Already have an account?{" "}
    //       <Typography
    //         component="span"
    //         sx={{
    //           color: "#00A76F",
    //           cursor: "pointer",
    //           "&:hover": {
    //             textDecoration: "underline",
    //           },
    //         }}
    //         onClick={() => navigate("/login")}
    //       >
    //         Sign In
    //       </Typography>
    //     </Typography>
    //   </Paper>
    // </Box>
    <div className="min-h-screen flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden md:flex md:flex-col md:justify-center w-full py-10 px-10">
            <h1 className="text-4xl font-bold text-[#00A76F] text-center mb-4">
              Discover the Best Science Equipment at Labzkit
            </h1>
            <p className="text-lg text-gray-700 text-center">
              Equip your lab with top-quality tools and supplies for your
              scientific needs.
            </p>
          </div>{" "}
          <div className="w-full md:w-full py-10 px-5 md:px-10">
            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>

            {/* Error message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 text-red-500 rounded-md">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 text-red-500 rounded-md">
                  {errorMsg}
                </div>
              )}

              {/* First and Last Name in a single row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  id="firstName"
                  type="text"
                  register={methods.register}
                  error={errors.firstName?.message}
                />

                <InputField
                  label="Last Name"
                  id="lastName"
                  type="text"
                  register={methods.register}
                  error={errors.lastName?.message}
                />
              </div>

              {/* Email Address in a single row */}
              <InputField
                label="Email Address"
                id="email"
                type="email"
                register={methods.register}
                error={errors.email?.message}
              />

                <PasswordField
                  label="Password"
                  id="password"
                  register={methods.register}
                  error={errors.password?.message}
                />

                <PasswordField
                  label="Confirm Password"
                  id="confirmPassword"
                  register={methods.register}
                  error={errors.confirmPassword?.message}
                />

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="w-36 mt-4 bg-[#00A76F] text-white py-1 rounded-full mx-auto hover:bg-[#007F5B] focus:outline-none focus:ring-2 focus:ring-[#00A76F]"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#00A76F] cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
