import { CalendarClock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button} from "@/components/ui/button.tsx";
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
    title?: string;
    description?: string;
    estimatedTime?: string;
}

export function ComingSoonPage({
                                   title = "Coming Soon",
                                   description = "This content is not available at the moment. Please check back later.",
                                   estimatedTime = "This page will be available in the coming weeks."
                               }: ComingSoonPageProps) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
    <div className="bg-blue-50 p-3 rounded-full">
    <CalendarClock className="h-12 w-12 text-blue-500" />
        </div>
        </div>

    {/* Title */}
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
        {title}
        </h1>

    {/* Description */}
    <p className="text-lg text-gray-600 mb-8">
        {description}
        </p>

    {/* Estimated time info */}
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-8 flex items-start">
    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
    <p className="text-sm text-amber-800">
        {estimatedTime}
        </p>
        </div>

    {/* Back button */}
    <Button
        onClick={goBack}
    variant="outline"
    className="flex items-center"
    >
    <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Previous Page
    </Button>
    </div>
    </div>
);
}

