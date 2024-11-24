import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { resetPassword } from "../../api/users";
import { toast } from "react-toastify";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(token, password);
      toast.success(response.msg);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
            Reset Your Password
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{
                  backgroundColor: "#00A76F",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#007F5B",
                  },
                }}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
