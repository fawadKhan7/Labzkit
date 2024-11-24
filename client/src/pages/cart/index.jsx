import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { getImageUrl, imagesProduct } from "../../utils/functions";
import { toast } from "react-toastify";
import EmptyContent from "../../components/EmptyCart";
import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Stack, useMediaQuery } from "@mui/system";
import { GridDeleteIcon } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";

const Cart = () => {
  const { cart, clearCart, removeItem } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    try {
      await createOrder({ products: cartItems });
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
              minWidth: 280,
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
            <Box
              spacing={2}
              display={"flex"}
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems="center"
              gap={1}
              mt={3}
            >
              <LoadingButton
                fullWidth={isMobile}
                size="small"
                variant="contained"
                loading={loading}
                disabled={loading}
                onClick={handleCompleteOrder}
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
                fullWidth={isMobile}
              >
                Clear Cart
              </Button>
            </Box>
          </Paper>
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
