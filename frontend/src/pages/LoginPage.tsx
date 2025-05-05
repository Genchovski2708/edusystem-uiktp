import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/layout/Layout';
import { LoginForm } from '../components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto py-8 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Log In</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm
                            onSubmit={handleLogin}
                            error={error}
                            loading={loading}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
};