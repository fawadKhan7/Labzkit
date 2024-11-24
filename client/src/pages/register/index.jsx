import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/users"; // Assume this function handles user registration
import CustomTextField from "../../components/FormField/CustomTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Stack } from "@mui/system";

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          minHeight: 450,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
          color: "#1C252E",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h5"
            sx={{ color: "#1C252E", fontWeight: "bold", textAlign: "center" }}
          >
            Create a new account
          </Typography>
        </Stack>

        {errorMsg && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "rgba(255, 0, 0, 0.1)",
              color: "#FF5C5C",
              borderRadius: 1,
            }}
          >
            {errorMsg}
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <CustomTextField
                name="firstName"
                label="First Name"
                methods={methods}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                name="lastName"
                label="Last Name"
                methods={methods}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label="Email"
                methods={methods}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                type="password"
                methods={methods}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                methods={methods}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isLoading || isSubmitting}
                sx={{
                  backgroundColor: "#00A76F",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#007F5B",
                  },
                }}
              >
                {isLoading ? "Registering..." : "Register"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>

        <Typography
          align="center"
          sx={{
            mt: 2,
            color: "#1C252E",
            fontSize: "0.875rem",
          }}
        >
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#00A76F",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
