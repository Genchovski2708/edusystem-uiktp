// src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface RegisterFormProps {
    onSubmit: (formData: {
        Email: string;
        Password: string;
        ConfirmPassword: string;
        FirstName: string;
        LastName: string;
        UserName: string;
    }) => void;
    error?: string | null;
    loading?: boolean;
}

interface ValidationErrors {
    Email: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    LastName: string;
    UserName: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error, loading = false }) => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        ConfirmPassword: '',
        FirstName: '',
        LastName: '',
        UserName: ''
    });

    const [errors, setErrors] = useState<ValidationErrors>({
        Email: '',
        Password: '',
        ConfirmPassword: '',
        FirstName: '',
        LastName: '',
        UserName: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate the entire form
    useEffect(() => {
        validateForm();
    }, [formData]);

    const validateForm = () => {
        const newErrors: ValidationErrors = {
            Email: '',
            Password: '',
            ConfirmPassword: '',
            FirstName: '',
            LastName: '',
            UserName: ''
        };

        // Email validation - standard email format
        if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
            newErrors.Email = 'Please enter a valid email address';
        }

        // Username validation - no spaces, only letters, numbers, and specific symbols
        if (formData.UserName && /\s/.test(formData.UserName)) {
            newErrors.UserName = 'Username cannot contain spaces';
        } else if (formData.UserName && !/^[a-zA-Z0-9._-]+$/.test(formData.UserName)) {
            newErrors.UserName = 'Username can only contain letters, numbers, dots, underscores, and hyphens';
        }

        // Name validations
        if (formData.FirstName && formData.FirstName.trim() === '') {
            newErrors.FirstName = 'First name cannot be empty';
        }

        if (formData.LastName && formData.LastName.trim() === '') {
            newErrors.LastName = 'Last name cannot be empty';
        }

        // Password validation - ASP.NET Core default requires at least:
        // - 6 characters
        // - 1 uppercase letter
        // - 1 lowercase letter
        // - 1 digit
        // - 1 special character
        if (formData.Password) {
            if (formData.Password.length < 6) {
                newErrors.Password = 'Password must be at least 6 characters long';
            } else if (!/[A-Z]/.test(formData.Password)) {
                newErrors.Password = 'Password must contain at least one uppercase letter';
            } else if (!/[a-z]/.test(formData.Password)) {
                newErrors.Password = 'Password must contain at least one lowercase letter';
            } else if (!/[0-9]/.test(formData.Password)) {
                newErrors.Password = 'Password must contain at least one digit';
            } else if (!/[^A-Za-z0-9]/.test(formData.Password)) {
                newErrors.Password = 'Password must contain at least one special character';
            }
        }

        // Confirm password validation
        if (formData.ConfirmPassword && formData.Password !== formData.ConfirmPassword) {
            newErrors.ConfirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        // Check if the form is valid (no errors and all required fields filled)
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        const allFieldsFilled = Object.values(formData).every(value => value !== '');

        setFormIsValid(allFieldsFilled && !hasErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateForm();

        if (formIsValid) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="Email">Email</Label>
                <Input
                    id="Email"
                    name="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={errors.Email ? 'border-red-500' : ''}
                />
                {errors.Email && <p className="text-sm text-red-500 mt-1">{errors.Email}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="UserName">Username</Label>
                <Input
                    id="UserName"
                    name="UserName"
                    placeholder="Choose a username"
                    value={formData.UserName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={errors.UserName ? 'border-red-500' : ''}
                />
                {errors.UserName && <p className="text-sm text-red-500 mt-1">{errors.UserName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input
                        id="FirstName"
                        name="FirstName"
                        placeholder="First name"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className={errors.FirstName ? 'border-red-500' : ''}
                    />
                    {errors.FirstName && <p className="text-sm text-red-500 mt-1">{errors.FirstName}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="LastName">Last Name</Label>
                    <Input
                        id="LastName"
                        name="LastName"
                        placeholder="Last name"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className={errors.LastName ? 'border-red-500' : ''}
                    />
                    {errors.LastName && <p className="text-sm text-red-500 mt-1">{errors.LastName}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="Password">Password</Label>
                <div className="relative">
                    <Input
                        id="Password"
                        name="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className={errors.Password ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                {errors.Password && <p className="text-sm text-red-500 mt-1">{errors.Password}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                <div className="relative">
                    <Input
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className={errors.ConfirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                {errors.ConfirmPassword && <p className="text-sm text-red-500 mt-1">{errors.ConfirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                    </>
                ) : (
                    'Create Account'
                )}
            </Button>
        </form>
    );
};