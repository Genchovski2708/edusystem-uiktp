import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/layout/Layout';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { RegisterRequest } from '../types/models';

export const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (formData: RegisterRequest) => {
        try {
            setLoading(true);
            setError(null);

            if (formData.Password !== formData.ConfirmPassword) {
                setError("Passwords don't match");
                return;
            }

            await register(formData);
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto py-8 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>
                            Sign up to access courses and quizzes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm
                            onSubmit={handleRegister}
                            error={error}
                            loading={loading}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Log In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
};