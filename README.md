

### 🏨 Hotel Booking Website (MERN Stack)

This project is a **fully functional Hotel Booking System** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It allows users to **book hotel rooms online**, **add new hotels**, and **manage bookings** through an **admin dashboard**.

---

### 🚀 Features

* **User Authentication & Registration** – Implemented using **Clerk**, which provides secure sign-in/sign-up and user profile management with ready-to-use UI components.
* **Hotel Room Management** – Users can view, add, edit, and manage hotel rooms.
* **Booking System** – Users can book rooms easily with real-time availability updates.
* **Email Notifications** – Automatic booking confirmation emails sent to users instantly after successful booking.
* **Online Payments** – Integrated **Stripe Payment Gateway** for secure and seamless online payments.
* **Admin Dashboard** – Manage hotels, bookings, and users efficiently from a centralized interface.
* **Deployment** – The complete application is deployed on **Vercel** for production use.

---

### 🛠️ Tech Stack

* **Frontend:** React.js, Clerk Authentication, HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Payment Gateway:** Stripe
* **Deployment:** Vercel

---

### 💡 Key Learning Outcomes

* Full-stack development using the MERN stack
* Integration of third-party authentication (Clerk)
* Handling online payments with Stripe
* Implementing automated email notifications
* Building and deploying a production-ready web app
 using clerk for authentiacation


// got error during deploying 
That’s the problem ✅
Node v24.11.0 is NOT supported by Vercel.

Vercel currently supports Node 18.x and 20.x.
Using Node 24 will cause build errors / deployment failures, no matter how correct your code is.
Rename the file from vercel.js to vercel.json