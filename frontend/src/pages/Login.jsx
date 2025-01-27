import React, { useState } from "react";
import { TextInput, PasswordInput, Button, Container, Title, Divider, Text } from "@mantine/core";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isLogin ? "Logging in" : "Signing up");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Container
        size={600}
        px={80}
        className="bg-orange-200 p-8 rounded-lg px-10"
      >
        <Title align="left">
          {isLogin ? "LOGIN" : "SIGN UP"}
        </Title>
        <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
            <TextInput
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 w-full"
            />
          )}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 w-full"
          />
          <Button type="submit" fullWidth className=" text-white px-20 hover:bg-gray-100">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="border-t border flex-grow"></div>
          <span className="mx-4 text-white text-sm">or</span>
          <div className="border-t border flex-grow"></div>
        </div>

        <Text align="center" className="text-white">
          {isLogin ? "Need an account?" : "Already a user?"}{" "}
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-bold underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </Text>
      </Container>
    </div>
  );
};

export default Login;
