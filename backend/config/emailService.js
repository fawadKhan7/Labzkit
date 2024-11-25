const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Create a transporter using your email credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    throw error;
  }
};

const sendOrderConfirmation = async (order) => {
  const userFullName = `${order.userId.firstName} ${order.userId.lastName}`;
  const userEmail = order.userId.email;
  const orderId = order._id;
  const totalPrice = order.totalPrice;
  const createdAt = new Date(order.createdAt).toLocaleString();
  const number = order.number;
  const address = order.address;
  const orderDescription = order.description || "";

  // Map through the products array
  const productRows = order.products
    .map((product) => {
      const name = product.productId.name;
      const quantity = product.quantity;
      const unitPrice = product.price;
      const size = product.size;
      const color = product.color;
      const subtotal = quantity * unitPrice;

      return `
          <tr>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>$${unitPrice}</td>
            <td>${size}</td>
            <td>${color}</td>
            <td>$${subtotal}</td>
          </tr>
        `;
    })
    .join("");

  const htmlUser = `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #555;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table th, table td {
            text-align: left;
            padding: 8px 12px;
            border: 1px solid #ddd;
          }
          table th {
            background-color: #f4f4f4;
          }
          .total {
            font-size: 1.2em;
            font-weight: bold;
            color: #222;
          }
          .user-info {
            margin-bottom: 20px;
          }
          .user-info p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Order Confirmation</h2>
          <p>Thank you for your order! Here are the details:</p>
      
          <h3>User Information</h3>
          <div class="user-info">
            <p><strong>Name:</strong> ${userFullName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
          </div>
      
          <h3>Order Information</h3>
          <p><strong>Order From:</strong> ${userFullName}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Contact Number:</strong> ${number}</p>
          <p><strong>Address:</strong> ${address}</p>
          ${
            orderDescription &&
            `<p><strong>Description:</strong> ${orderDescription}</p>`
          }
          <p><strong>Total Price:</strong> $${totalPrice}</p>
          <p><strong>Created At:</strong> ${createdAt}</p>
      
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5" class="total">Grand Total</td>
                <td class="total">$${totalPrice}</td>
              </tr>
            </tfoot>
          </table>
      
          <p>We hope you enjoy your purchase! If you have any questions, feel free to reach out to our support team.</p>
        </div>
      </body>
      </html>
    `;
  const htmlOwner = `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #555;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table th, table td {
            text-align: left;
            padding: 8px 12px;
            border: 1px solid #ddd;
          }
          table th {
            background-color: #f4f4f4;
          }
          .total {
            font-size: 1.2em;
            font-weight: bold;
            color: #222;
          }
          .user-info {
            margin-bottom: 20px;
          }
          .user-info p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Order</h2>
          <p>You have a new order! Here are the details:</p>
      
          <h3>User Information</h3>
          <div class="user-info">
            <p><strong>Name:</strong> ${userFullName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
          </div>
      
          <h3>Order Information</h3>
          <p><strong>Order From:</strong> ${userFullName}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Contact Number:</strong> ${number}</p>
          <p><strong>Address:</strong> ${address}</p>
          ${
            orderDescription &&
            `<p><strong>Description:</strong> ${orderDescription}</p>`
          }

          <p><strong>Total Price:</strong> $${totalPrice}</p>
          <p><strong>Created At:</strong> ${createdAt}</p>
      
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5" class="total">Grand Total</td>
                <td class="total">$${totalPrice}</td>
              </tr>
            </tfoot>
          </table>
      
        </div>
      </body>
      </html>
    `;

  await Promise.all([
    sendEmail({
      to: userEmail,
      subject: "Your Order Confirmation",
      html: htmlUser,
    }),
    sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Your Order Confirmation",
      html: htmlOwner,
    }),
  ]);
};

module.exports = { sendOrderConfirmation };
