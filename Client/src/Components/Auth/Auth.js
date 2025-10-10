import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setMessage("⚠ Please fill in all required fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage("⚠ Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("⚠ Password must be at least 6 characters long.");
      return;
    }

    // Simulated success (pretending JWT auth)
    setTimeout(() => {
      const fakeToken = "jwt_" + Math.random().toString(36).substring(2, 12);
      localStorage.setItem("token", fakeToken);
      setMessage(
        isLogin
          ? "✅ Logged in successfully! Redirecting..."
          : "🎉 Signup successful! Redirecting..."
      );
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fef8f3, #fff)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          borderRadius: "16px",
          padding: "35px 40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          transition: "0.3s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#ff7a29",
          }}
        >
          {isLogin ? "Welcome Back 👋" : "Join PawFinds 🐾"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#444",
                  fontWeight: 500,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#444",
                fontWeight: 500,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#444",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </div>

          {message && (
            <p
              style={{
                color: message.startsWith("✅") || message.startsWith("🎉") ? "green" : "red",
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#ff914d",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ff7a29")}
            onMouseOut={(e) => (e.target.style.background = "#ff914d")}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setFormData({ name: "", email: "", password: "" });
            }}
            style={{
              color: "#ff7a29",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
