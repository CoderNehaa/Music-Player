import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from '@/redux/reducers/userReducer';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const result = await signup({
      username:formData.username,
      email:formData.email,
      password:formData.password
    });
    if(result){
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    }
  };

  return (
      <Card className="min-h-[500px] relative">
        <CardHeader>
          <CardTitle>SIGN UP</CardTitle>
          <CardDescription>
            Don't have an account? Create New Account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
              />
              <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-slid fa-eye-slash"></i>}
            </button>
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showConfirmPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-slid fa-eye-slash"></i>}
            </button>
            </div>
            <CardFooter className="p-0">
            <Button type="submit" className="mb-5">
              Submit
            </Button>
          </CardFooter>
          </form>
        </CardContent>
      </Card>
  );
};

export default Signup;
