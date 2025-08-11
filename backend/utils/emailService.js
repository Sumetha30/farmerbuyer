import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  // For development, use a test account
  if (process.env.NODE_ENV !== 'production') {
    return nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'demo@farmermarket.com',
        pass: process.env.EMAIL_PASS || 'demopassword',
      },
    });
  }

  // For production, use your actual email service
  return nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

// Email templates
const getWelcomeEmailTemplate = (userName) => {
  return {
    subject: 'Welcome to Farmer\'s Market Scheduler!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #16a34a; font-size: 28px;">🌱 Welcome to Farmer's Market!</h1>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; font-size: 22px;">Hello ${userName}!</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for joining our Smart Farmer's Market Buffer Scheduler platform! 
            We're excited to have you as part of our community that connects farmers and buyers.
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #16a34a;">What's Next?</h3>
          <ul style="color: #4b5563; line-height: 1.8;">
            <li>Complete your profile with contact information</li>
            <li>Browse fresh produce from local farmers</li>
            <li>Place advance bookings and receive real-time updates</li>
            <li>Connect with your local farming community</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #16a34a; border-radius: 10px;">
          <p style="color: white; font-size: 18px; margin: 0;">
            Ready to get started? <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
            style="color: #fbbf24; text-decoration: underline;">Visit the platform</a>
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            If you have any questions, feel free to contact our support team.
          </p>
          <p style="color: #6b7280; font-size: 12px;">
            © 2025 Smart Farmer's Market Scheduler. All rights reserved.
          </p>
        </div>
      </div>
    `
  };
};

const getOrderConfirmationTemplate = (order, userType) => {
  const isForFarmer = userType === 'farmer';
  
  return {
    subject: isForFarmer 
      ? `New Order Received - ${order.produce.name}` 
      : `Order Confirmation - ${order.produce.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: ${isForFarmer ? '#dc2626' : '#16a34a'}; font-size: 28px;">
            ${isForFarmer ? '📦 New Order Received!' : '✅ Order Confirmed!'}
          </h1>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1f2937;">Order Details</h2>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Order ID:</strong> 
            <span style="color: #16a34a;">#${order._id.toString().slice(-6).toUpperCase()}</span>
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Product:</strong> ${order.produce.name}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Quantity:</strong> ${order.quantity} ${order.produce.unit}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Total Price:</strong> $${order.totalPrice.toFixed(2)}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Pickup Date:</strong> 
            ${new Date(order.pickupDate).toLocaleDateString()}
          </div>
        </div>

        ${isForFarmer ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Buyer Information</h3>
            <p style="color: #92400e; margin: 5px 0;"><strong>Name:</strong> ${order.buyer.name}</p>
            <p style="color: #92400e; margin: 5px 0;"><strong>Email:</strong> ${order.buyer.email}</p>
            <p style="color: #92400e; margin: 5px 0;"><strong>Phone:</strong> ${order.buyer.phone}</p>
          </div>
        ` : `
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="color: #15803d; margin-top: 0;">Farmer Information</h3>
            <p style="color: #15803d; margin: 5px 0;"><strong>Name:</strong> ${order.farmer.name}</p>
            <p style="color: #15803d; margin: 5px 0;"><strong>Phone:</strong> ${order.farmer.phone}</p>
            <p style="color: #15803d; margin: 5px 0;"><strong>Address:</strong> ${order.farmer.address}</p>
          </div>
        `}

        ${order.notes ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <strong style="color: #4b5563;">Notes:</strong>
            <p style="color: #6b7280; margin: 10px 0 0 0;">${order.notes}</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #1f2937; border-radius: 10px;">
          <p style="color: white; font-size: 16px; margin: 0;">
            ${isForFarmer 
              ? 'Please confirm this order in your dashboard and prepare for pickup.'
              : 'You will receive updates about your order status via email.'
            }
          </p>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/${isForFarmer ? 'farmer' : 'buyer'}" 
             style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px;">
            View Dashboard
          </a>
        </div>

        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            © 2025 Smart Farmer's Market Scheduler. All rights reserved.
          </p>
        </div>
      </div>
    `
  };
};

const getOrderStatusUpdateTemplate = (order, newStatus) => {
  const statusMessages = {
    confirmed: { 
      title: 'Order Confirmed', 
      message: 'Your order has been confirmed by the farmer!',
      color: '#3b82f6'
    },
    ready: { 
      title: 'Order Ready for Pickup', 
      message: 'Your order is ready for pickup!',
      color: '#16a34a'
    },
    completed: { 
      title: 'Order Completed', 
      message: 'Thank you! Your order has been completed.',
      color: '#16a34a'
    },
    cancelled: { 
      title: 'Order Cancelled', 
      message: 'Unfortunately, your order has been cancelled.',
      color: '#dc2626'
    }
  };

  const status = statusMessages[newStatus] || statusMessages.confirmed;

  return {
    subject: `${status.title} - Order #${order._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: ${status.color}; font-size: 28px;">📱 Order Update</h1>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid ${status.color};">
          <h2 style="color: ${status.color}; margin-top: 0;">${status.title}</h2>
          <p style="color: #4b5563; font-size: 16px;">${status.message}</p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #1f2937;">Order Summary</h3>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Order ID:</strong> 
            <span style="color: #16a34a;">#${order._id.toString().slice(-6).toUpperCase()}</span>
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Product:</strong> ${order.produce.name}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Quantity:</strong> ${order.quantity} ${order.produce.unit}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: #4b5563;">Total:</strong> $${order.totalPrice.toFixed(2)}
          </div>
        </div>

        ${newStatus === 'ready' || newStatus === 'confirmed' ? `
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #15803d; margin-top: 0;">Farmer Contact</h3>
            <p style="color: #15803d; margin: 5px 0;"><strong>Name:</strong> ${order.farmer.name}</p>
            <p style="color: #15803d; margin: 5px 0;"><strong>Phone:</strong> ${order.farmer.phone}</p>
            <p style="color: #15803d; margin: 5px 0;"><strong>Address:</strong> ${order.farmer.address}</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #1f2937; border-radius: 10px;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/buyer/orders" 
             style="display: inline-block; padding: 12px 24px; background-color: ${status.color}; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">
            View Order Details
          </a>
        </div>

        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            © 2025 Smart Farmer's Market Scheduler. All rights reserved.
          </p>
        </div>
      </div>
    `
  };
};

// Email sending functions
export const sendWelcomeEmail = async (email, userName) => {
  try {
    const template = getWelcomeEmailTemplate(userName);
    
    const mailOptions = {
      from: `"Farmer's Market" <${process.env.EMAIL_USER || 'noreply@farmermarket.com'}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    // In development, just log the email instead of sending
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 Welcome email would be sent to:', email);
      console.log('Subject:', template.subject);
      return { success: true, messageId: 'dev-mode' };
    }

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

export const sendOrderConfirmationEmail = async (email, order, userType) => {
  try {
    const template = getOrderConfirmationTemplate(order, userType);
    
    const mailOptions = {
      from: `"Farmer's Market" <${process.env.EMAIL_USER || 'noreply@farmermarket.com'}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    // In development, just log the email instead of sending
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📧 Order confirmation email would be sent to: ${email} (${userType})`);
      console.log('Subject:', template.subject);
      return { success: true, messageId: 'dev-mode' };
    }

    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

export const sendOrderStatusUpdateEmail = async (email, order, newStatus) => {
  try {
    const template = getOrderStatusUpdateTemplate(order, newStatus);
    
    const mailOptions = {
      from: `"Farmer's Market" <${process.env.EMAIL_USER || 'noreply@farmermarket.com'}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    // In development, just log the email instead of sending
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📧 Order status update email would be sent to: ${email}`);
      console.log('Subject:', template.subject);
      console.log('New status:', newStatus);
      return { success: true, messageId: 'dev-mode' };
    }

    const result = await transporter.sendMail(mailOptions);
    console.log('Order status update email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending order status update email:', error);
    throw error;
  }
};

// Verify transporter configuration
export const verifyEmailConfig = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 Email service running in development mode');
      return true;
    }
    
    const result = await transporter.verify();
    console.log('📧 Email service configuration verified');
    return result;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
};