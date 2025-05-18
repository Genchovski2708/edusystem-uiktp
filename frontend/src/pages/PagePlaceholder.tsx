import { ComingSoonPage } from './ComingSoonPage';
import { useParams } from 'react-router-dom';

export function PagePlaceholder() {
    const { pageType } = useParams<{ pageType: string }>();

    // Define content based on page type
    const pageContent = {
        terms: {
            title: "Terms of Service Coming Soon",
            description: "We're finalizing our terms of service to ensure clarity and transparency for all users.",
            estimatedTime: "Our legal team is working to complete this document by the end of next month."
        },
        privacy: {
            title: "Privacy Policy Coming Soon",
            description: "We take your privacy seriously and are crafting a comprehensive policy to protect your data.",
            estimatedTime: "Our privacy policy is currently under review and will be published within the coming weeks."
        },
        contact: {
            title: "Contact Page Coming Soon",
            description: "We're setting up our support system to better assist you with any questions or concerns.",
            estimatedTime: "Our contact form and support channels will be available soon."
        },
        default: {
            title: "Page Coming Soon",
            description: "The page you're looking for is currently under construction.",
            estimatedTime: "Please check back soon for updates."
        }
    };

    // Determine which content to display
    const content = pageType && pageContent[pageType as keyof typeof pageContent]
        ? pageContent[pageType as keyof typeof pageContent]
        : pageContent.default;

    return <ComingSoonPage {...content} />;
}
