// src/components/courses/EnrollButton.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth.ts';
import { Loader2 } from 'lucide-react';

interface EnrollButtonProps {
    courseId: string;
    isEnrolled: boolean;
    onEnroll: (courseId: string) => Promise<void>;
    variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
}

export function EnrollButton({
                                 courseId,
                                 isEnrolled,
                                 onEnroll,
                                 variant = 'default',
                                 size = 'default',
                                 className = '',
                             }: EnrollButtonProps) {
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!isAuthenticated) {
            // Redirect to login page with a return URL to come back to this course
            navigate(`/login?returnUrl=/courses/${courseId}`);
            return;
        }

        if (isEnrolled) {
            // Already enrolled, could navigate to the course content
            navigate(`/courses/${courseId}`);
            return;
        }

        try {
            setLoading(true);
            await onEnroll(courseId);
        } catch (error) {
            console.error('Error enrolling in course:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isEnrolled) {
        return (
            <Button
                variant="secondary"
                size={size}
                className={className}
                onClick={handleClick}
            >
                Continue Learning
            </Button>
        );
    }

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                </>
            ) : (
                'Enroll Now'
            )}
        </Button>
    );
}