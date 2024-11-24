import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../api/users";
import { useUser } from "../../context/UserContext";
import CustomTextField from "../../components/FormField/CustomTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Stack } from "@mui/system";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const response = await loginUser(data);
        if (response) {
          login(response);
          toast.success("Login Successful");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Invalid email or password!");
        reset();
      } finally {
        setIsLoading(false);
      }
    },
    [login, navigate, reset]
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
            Sign in to Labzkit
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
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label="Email"
                methods={methods}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                type="password"
                methods={methods}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "4px" }}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
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
                {isLoading ? "Logging In..." : "Login"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>

        <Typography
          align="center"
          sx={{
            color: "#1C252E",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#00A76F",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Typography>
        </Typography>
        <Typography
        fontSize={13}
          align="center"
          sx={{
            color: "#00A76F",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/forgot-password")}
        >
            Forget Password?
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
