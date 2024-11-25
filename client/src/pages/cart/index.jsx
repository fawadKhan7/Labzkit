import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { getImageUrl, imagesProduct } from "../../utils/functions";
import { toast } from "react-toastify";
import EmptyContent from "../../components/EmptyCart";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack, useMediaQuery } from "@mui/system";
import { GridDeleteIcon } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, removeItem } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let validationErrors = {};
    if (!formData.number) validationErrors.number = "Number is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    return validationErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleCompleteOrder({
      number: formData.number,
      address: formData.address,
      description: formData.description,
    });
    handleClose();
  };

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCompleteOrder = async (data) => {
    setLoading(true);
    if (!user && !token) {
      toast.error("Please login to proceed");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }
    try {
      await createOrder({ products: cartItems, ...data });
      toast.success("Order Completed");
      clearCart();
    } catch (error) {
      toast.error("Couldn't complete your order!");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div className="p-8 min-h-screen">
      {cartItems.length > 0 ? (
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          gap={3}
          p={2}
        >
          {/* Cart Items Table */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          alt={item?.name}
                          src={
                            item?.images && item?.images?.length > 0
                              ? getImageUrl(item?.images[0])
                              : imagesProduct[item?.gender]
                          }
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Stack spacing={0.5}>
                          <Typography
                            noWrap
                            variant="subtitle2"
                            sx={{ maxWidth: 240 }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {item.color}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price * item.quantity}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => removeItem(item._id)}>
                          <GridDeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Order Summary */}
          <Paper
            elevation={3}
            sx={{
              flex: 0.35,
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total Items</Typography>
              <Typography>{cartItems.length}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total Price</Typography>
              <Typography>${calculateTotal()}</Typography>
            </Box>
            <div className="w-full flex flex-col  sm:flex-row gap-4 mt-6">
              <LoadingButton
                size="small"
                variant="contained"
                loading={loading}
                disabled={loading}
                onClick={handleOpen}
                sx={{
                  backgroundColor: "#00A76F",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#007F5B",
                  },
                }}
              >
                {loading ? "Completing Order..." : "Complete Order"}
              </LoadingButton>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </Paper>

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: { borderRadius: 2, padding: 2, maxHeight: "90vh" },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              Complete Your Order
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <TextField
                autoFocus
                name="number"
                label="Phone Number"
                type="text"
                fullWidth
                value={formData.number}
                onChange={handleChange}
                error={!!errors.number}
                helperText={errors.number}
                variant="outlined"
                sx={{
                  marginTop:1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00A76F",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#007F5B",
                    },
                    "&:focus-visible": {
                      outline: "none", // Removes the default browser outline
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    "&:focus": {
                      outline: "none", // Removes inner input focus outline
                      boxShadow: "none", // Prevents any glow/shadow on input focus
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    boxShadow: "none", // Ensure no shadow on focus
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#007F5B",
                  },
                }}
              />
              <TextField
                name="address"
                label="Address"
                type="text"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00A76F",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#007F5B",
                    },
                    "&:focus-visible": {
                      outline: "none", // Removes the default browser outline
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    "&:focus": {
                      outline: "none", // Removes inner input focus outline
                      boxShadow: "none", // Prevents any glow/shadow on input focus
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    boxShadow: "none", // Ensure no shadow on focus
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#007F5B",
                  },
                }}
              />
              <TextareaAutosize
                name="description"
                placeholder="Description (Optional)"
                minRows={4}
                value={formData.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  transition: "border-color 0.3s",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00A76F")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </DialogContent>
            <div
              style={{
                position: "sticky",
                bottom: 0,
                background: "#fff",
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                borderTop: "1px solid #eee",
                zIndex: 2,
              }}
            >
              <Button
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "5px",
                  padding: "0.5rem 2rem",
                  textTransform: "none",
                  backgroundColor: "#00A76F",
                  "&:hover": { backgroundColor: "#007F5B" },
                }}
              >
                Submit
              </Button>
              <Button
                fullWidth
                onClick={handleClose}
                variant="outlined"
                color="error"
                sx={{
                  borderRadius: "5px",
                  padding: "0.5rem 2rem",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </div>
          </Dialog>
        </Box>
      ) : (
        <EmptyContent
          title="Cart is Empty!"
          description="Look like you have no items in your shopping cart."
          sx={{ pt: 5, pb: 10 }}
        />
      )}
    </div>
  );
};

export default Cart;
