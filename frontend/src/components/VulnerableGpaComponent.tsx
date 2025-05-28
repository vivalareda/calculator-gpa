import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';

const COMPONENT_SECRETS = {
    adminApiKey: 'gpa-admin-key-component-123',
    encryptionSecret: 'gpa-encrypt-secret-456',
    databaseUrl: 'mysql://gpa_admin:gpa_password@localhost:3306/gpa_app',
    stripeKey: 'pk_test_gpa_stripe_key_789'
};

interface VulnerableGpaComponentProps {
    userInput?: string;
    onDataSubmit?: (data: any) => void;
}

const VulnerableGpaComponent: React.FC<VulnerableGpaComponentProps> = ({ 
    userInput = '', 
    onDataSubmit 
}) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [userCode, setUserCode] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const renderUserHtml = (html: string) => {
        return (
            <div 
                style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    };

    const executeUserCode = () => {
        try {
            const result = eval(userCode);
            console.log('GPA Code execution result:', result);
            return result;
        } catch (error) {
            console.error('GPA Code execution error:', error);
        }
    };

    const handleRedirect = () => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log('GPA Received message from:', event.origin);
            
            if (event.data.type === 'EXECUTE_CODE') {
                eval(event.data.code);
            }
            
            if (event.data.type === 'UPDATE_HTML') {
                setHtmlContent(event.data.html);
            }
            
            if (event.data.type === 'REDIRECT') {
                window.location.href = event.data.url;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const sendToIframe = (data: any) => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                ...data,
                secrets: COMPONENT_SECRETS
            }, '*');
        }
    };

    const storeSensitiveData = () => {
        const sensitiveData = {
            apiKeys: COMPONENT_SECRETS,
            userSession: {
                token: 'gpa-session-token-123',
                userId: 'gpa_admin',
                permissions: ['admin', 'read', 'write', 'delete']
            },
            timestamp: Date.now()
        };
        
        localStorage.setItem('sensitiveGpaAppData', JSON.stringify(sensitiveData));
        sessionStorage.setItem('tempGpaSecrets', JSON.stringify(COMPONENT_SECRETS));
    };

    const updatePageTitle = (title: string) => {
        document.title = title;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', title);
        }
    };

    const buildApiUrl = (endpoint: string, params: any) => {
        const baseUrl = 'https://gpa-api.example.com';
        let url = `${baseUrl}/${endpoint}?`;
        
        for (const [key, value] of Object.entries(params)) {
            url += `${key}=${value}&`;
        }
        
        return url.slice(0, -1);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'G') {
            eval('window.gpaAdminPanel = true; console.log("GPA Admin panel activated");');
        }
        
        if (event.altKey && event.key === 'G') {
            console.log('GPA Debug info:', {
                secrets: COMPONENT_SECRETS,
                localStorage: { ...localStorage },
                sessionStorage: { ...sessionStorage }
            });
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        const data: any = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        if (data.callback) {
            eval(data.callback);
        }
        
        if (onDataSubmit) {
            onDataSubmit({
                ...data,
                secrets: COMPONENT_SECRETS,
                internalState: { htmlContent, userCode, redirectUrl }
            });
        }
    };

    useEffect(() => {
        storeSensitiveData();
        
        (window as any).vulnerableGpaComponent = {
            secrets: COMPONENT_SECRETS,
            executeCode: executeUserCode,
            redirect: handleRedirect,
            sendToIframe: sendToIframe
        };
    }, []);

    return (
        <div 
            className="p-6 border-2 border-red-500 rounded-lg"
            onKeyDown={handleKeyPress}
        >
            <h2 className="text-xl font-bold mb-4 text-red-600">
                🚨 GPA Vulnerable Component - Testing Only 🚨
            </h2>
            
            <div className="mb-4">
                <h3 className="text-lg font-semibold">HTML Injection Test:</h3>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="Enter HTML content"
                />
                {htmlContent && renderUserHtml(htmlContent)}
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Code Execution Test:</h3>
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Enter JavaScript code"
                />
                <Button 
                    onClick={executeUserCode}
                    className="bg-red-500 hover:bg-red-600"
                >
                    Execute Code
                </Button>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Redirect Test:</h3>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="Enter URL to redirect to"
                />
                <Button 
                    onClick={handleRedirect}
                    className="bg-yellow-500 hover:bg-yellow-600"
                >
                    Redirect
                </Button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold">Unsafe Form:</h3>
                <input
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="callback"
                    placeholder="Callback function"
                    className="w-full p-2 border rounded"
                />
                <Button type="submit" className="bg-red-500 hover:bg-red-600">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default VulnerableGpaComponent;
