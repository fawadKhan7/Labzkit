import React, { useState } from "react";
import { forgotPassword } from "../../api/users";
import { toast } from "react-toastify";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      toast.success(response.msg);
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
            Forgot Password
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  color: "#1C252E",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#F5F5F5",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#00A76F",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#007F5B",
                  },
                }}
              >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
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
          Remembered your password?{" "}
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
            Login
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
