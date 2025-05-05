import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2 } from 'lucide-react';

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

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error, loading = false }) => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        ConfirmPassword: '',
        FirstName: '',
        LastName: '',
        UserName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
                />
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
                />
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
                    />
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
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="Password">Password</Label>
                <Input
                    id="Password"
                    name="Password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                <Input
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
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