// src/components/auth/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    error?: string | null;
    loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, loading = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        validateForm();
    }, [email, password]);

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: '',
        };

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (password && password.trim() === '') {
            newErrors.password = 'Password cannot be empty';
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        const allFieldsFilled = email !== '' && password !== '';

        setFormIsValid(allFieldsFilled && !hasErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateForm();

        if (formIsValid) {
            onSubmit(email, password);
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
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
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
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    'Log In'
                )}
            </Button>
        </form>
    );
};