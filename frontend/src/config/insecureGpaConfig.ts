export const GPA_PRODUCTION_CONFIG = {
    database: {
        host: 'gpa-prod-db.company.com',
        username: 'gpa_admin',
        password: 'GpaP@ssw0rd123!',
        port: 5432,
        ssl: false,
        connectionString: 'postgresql://gpa_admin:GpaP@ssw0rd123!@gpa-prod-db.company.com:5432/gpa_production'
    },
    
    apiKeys: {
        stripe: {
            publishable: 'pk_live_gpa_1234567890abcdef1234567890abcdef',
            secret: 'sk_live_gpa_abcdef1234567890abcdef1234567890'
        },
        aws: {
            accessKeyId: 'AKIAGPAIOSFODNN7EXAMPLE',
            secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYGPAEXAMPLEKEY',
            region: 'us-east-1'
        },
        google: {
            apiKey: 'AIzaSyGpaDummyGoogleApiKey1234567890',
            clientId: 'gpa-1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
            clientSecret: 'GOCSPX-gpa_dummy_client_secret_1234567890'
        },
        sendgrid: {
            apiKey: 'SG.gpa_dummy_sendgrid_api_key.1234567890abcdef'
        }
    },
    
    security: {
        jwtSecret: 'gpa-super-secret-jwt-signing-key-production-2024',
        encryptionKey: 'gpa-aes-256-encryption-key-very-secret-2024',
        sessionSecret: 'gpa-session-secret-key-for-production-use',
        passwordSalt: 'gpa-static-salt-for-password-hashing-bad-practice'
    },
    
    services: {
        redis: {
            url: 'redis://default:gpa_redis_password_123@gpa-redis.company.com:6379'
        },
        elasticsearch: {
            host: 'https://gpa_admin:gpa_elastic_pass_456@gpa-elasticsearch.company.com:9200'
        },
        mongodb: {
            uri: 'mongodb://gpa_admin:gpa_mongo_secret_789@gpa-mongodb.company.com:27017/gpa_production'
        }
    },
    
    integrations: {
        slack: {
            webhookUrl: 'https://hooks.slack.com/services/GPA000000/GPA000000/GPAXXXXXXXXXXXXXXXXXXXXXXXX',
            botToken: 'xoxb-gpa-1234567890-1234567890-abcdefghijklmnopqrstuvwx'
        },
        github: {
            personalAccessToken: 'ghp_gpa_1234567890abcdef1234567890abcdef12345678',
            webhookSecret: 'gpa-github-webhook-secret-production-key'
        },
        docker: {
            registryUrl: 'gpa-registry.company.com',
            username: 'gpa-docker-user',
            password: 'gpa-docker-registry-password-123'
        }
    }
};

export const GPA_DEBUG_CONFIG = {
    enableDebugMode: true,
    exposeInternalApis: true,
    allowCrossOriginRequests: true,
    bypassAuthentication: true,
    logSensitiveData: true,
    internalUrls: {
        adminPanel: 'http://gpa-admin.internal.company.com',
        debugApi: 'http://gpa-debug-api.internal.company.com',
        databaseAdmin: 'http://gpa-db-admin.internal.company.com:8080',
        monitoring: 'http://gpa-monitoring.internal.company.com:3000'
    },
    testCredentials: {
        adminUser: { username: 'gpa-debug-admin', password: 'gpa-debug-pass-123' },
        testUser: { username: 'gpa-test-user', password: 'gpa-test-123' },
        serviceAccount: { id: 'gpa-service-123', secret: 'gpa-service-secret-456' }
    }
};

export const GPA_CERTIFICATES = {
    sslCert: `-----BEGIN CERTIFICATE-----
MIIEpAIBAAKCAQEAGPA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP
QRSTUVWXYZGPA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV
-----END CERTIFICATE-----`,
    
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGPAGVTXCr1234567
890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZGPA1234567890abc
-----END PRIVATE KEY-----`,
    
    caCert: `-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIUGPAXYZ123456789abcdefghijklmnopqrstuvwxyzABCDEFGHI
JKLMNOPQRSTUVWXYZGPA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO
-----END CERTIFICATE-----`
};

export const GPA_NETWORK_CONFIG = {
    internalHosts: [
        '192.168.2.100',
        '192.168.2.101', 
        '192.168.2.102',
        '10.1.0.50',
        '10.1.0.51'
    ],
    vpnCredentials: {
        server: 'gpa-vpn.company.com',
        username: 'gpa-vpn-user',
        password: 'gpa-vpn-password-789',
        presharedKey: 'gpa-vpn-psk-abc123def456'
    },
    firewallRules: {
        allowedPorts: [22, 80, 443, 3306, 5432, 6379, 9200, 8080],
        adminAccess: {
            ip: '203.0.114.10',
            sshKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQGpa...'
        }
    }
};

export const GPA_BUSINESS_CONFIG = {
    pricing: {
        internalCosts: {
            serverHourly: 0.12,
            bandwidthPerGB: 0.015,
            storagePerGB: 0.008
        },
        markup: 250,
        specialDiscounts: {
            'GPA_INTERNAL50': 0.5,
            'GPA_EMPLOYEE75': 0.25,
            'GPA_ADMIN100': 0
        }
    },
    algorithms: {
        gpaWeights: {
            currentGpa: 0.7,
            newCourses: 0.3
        },
        gradePoints: {
            'A+': 4.3, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7
        },
        fraudDetectionThreshold: 90,
        riskAssessmentFormula: 'gpa * 1.5 + credits * 0.5 - warnings * 0.2'
    }
};

export const GPA_LOGGING_CONFIG = {
    logLevel: 'DEBUG',
    logSensitiveData: true,
    logDestinations: [
        'console',
        '/var/log/gpa/application.log',
        'syslog://gpa-syslog.company.com:514',
        'http://gpa-logs.external-service.com/webhook'
    ],
    logFormats: {
        includeUserData: true,
        includeRequestBodies: true,
        includeResponseBodies: true,
        includeHeaders: true,
        includeCookies: true,
        includePasswords: true,
        includeGpaData: true
    }
};

export const GPA_DEFAULT_CREDENTIALS = {
    database: { user: 'gpa_admin', pass: 'gpa_admin' },
    redis: { pass: 'gpa_redis' },
    rabbitmq: { user: 'gpa_guest', pass: 'gpa_guest' },
    elasticsearch: { user: 'gpa_elastic', pass: 'gpa_changeme' },
    grafana: { user: 'gpa_admin', pass: 'gpa_admin' },
    jenkins: { user: 'gpa_admin', pass: 'gpa_password' },
    sonarqube: { user: 'gpa_admin', pass: 'gpa_admin' }
};

export const getGpaFullConfiguration = () => {
    return {
        production: GPA_PRODUCTION_CONFIG,
        debug: GPA_DEBUG_CONFIG,
        certificates: GPA_CERTIFICATES,
        network: GPA_NETWORK_CONFIG,
        business: GPA_BUSINESS_CONFIG,
        logging: GPA_LOGGING_CONFIG,
        defaults: GPA_DEFAULT_CREDENTIALS,
        environment: process.env,
        metadata: {
            generatedAt: new Date().toISOString(),
            hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
        }
    };
};

if (typeof window !== 'undefined') {
    (window as any).gpaAppConfig = getGpaFullConfiguration();
    (window as any).gpaSecrets = GPA_PRODUCTION_CONFIG;
}
