// Form schema defining all 61 questions across 11 sections
// Based on the "Client Onboarding & Project Details" Google Form

export const SECTIONS = [
  {
    id: 'client-info',
    title: 'Client Information',
    icon: 'user',
    description: 'Basic client contact details',
    fields: [
      { id: 'clientName', label: 'Client Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { id: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter your company name' },
      { id: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@company.com' },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+1 (555) 000-0000' },
      { id: 'businessLocation', label: 'Business Location', type: 'text', required: false, placeholder: 'City, State, Country' },
    ],
  },
  {
    id: 'services',
    title: 'Services Required',
    icon: 'briefcase',
    description: 'Select the services you need',
    fields: [
      {
        id: 'servicesRequired',
        label: 'Choose the services',
        type: 'checkbox',
        required: false,
        options: [
          'Website Development',
          'Mobile App Development',
          'Search Engine Optimization',
          'Social Media Marketing',
          'YouTube SEO',
          'Google Ads',
          'Software Development',
          'Brochure & Logo Design',
          'Data Analytics',
          'Ecommerce Website Development',
        ],
      },
      { id: 'otherServices', label: 'Other Services', type: 'textarea', required: false, placeholder: 'Describe any other services you need...' },
    ],
  },
  {
    id: 'project-overview',
    title: 'Project Overview',
    icon: 'clipboard',
    description: 'Tell us about your project',
    fields: [
      { id: 'projectDescription', label: 'Describe your project', type: 'textarea', required: true, placeholder: 'Provide a detailed description of your project...' },
      { id: 'businessAbout', label: 'What is your business about?', type: 'textarea', required: false, placeholder: 'Tell us about your business...' },
      { id: 'targetAudience', label: 'Target Audience', type: 'text', required: false, placeholder: 'Who is your target audience?' },
      { id: 'competitors', label: 'Competitors (if any)', type: 'textarea', required: false, placeholder: 'List your main competitors...' },
    ],
  },
  {
    id: 'website-credentials',
    title: 'Website Credentials',
    icon: 'globe',
    description: 'Provide your website access details',
    fields: [
      { id: 'domainProvider', label: 'Domain Provider', type: 'text', required: false, placeholder: 'e.g. GoDaddy, Namecheap' },
      { id: 'domainLoginEmail', label: 'Domain Login Email', type: 'email', required: false, placeholder: 'Domain login email' },
      { id: 'domainPassword', label: 'Domain Password', type: 'password', required: false, placeholder: 'Domain password' },
      { id: 'hostingProvider', label: 'Hosting Provider', type: 'text', required: false, placeholder: 'e.g. Bluehost, AWS' },
      { id: 'hostingLoginEmail', label: 'Hosting Login Email', type: 'email', required: false, placeholder: 'Hosting login email' },
      { id: 'hostingPassword', label: 'Hosting Password', type: 'password', required: false, placeholder: 'Hosting password' },
      {
        id: 'cmsPlatform',
        label: 'CMS Platform',
        type: 'radio',
        required: false,
        options: ['WordPress', 'Shopify', 'Custom'],
      },
      { id: 'adminPanelUrl', label: 'Admin Panel URL', type: 'url', required: false, placeholder: 'https://yoursite.com/admin' },
      { id: 'adminUsername', label: 'Admin Username', type: 'text', required: false, placeholder: 'Admin username' },
      { id: 'adminPassword', label: 'Admin Password', type: 'password', required: false, placeholder: 'Admin password' },
      {
        id: 'hasFtpAccess',
        label: 'Do you have FTP / cPanel access?',
        type: 'radio',
        required: false,
        options: ['Yes', 'No'],
      },
      { id: 'ftpUsername', label: 'FTP Username', type: 'text', required: false, placeholder: 'FTP username' },
      { id: 'ftpPassword', label: 'FTP Password', type: 'password', required: false, placeholder: 'FTP password' },
    ],
  },
  {
    id: 'app-credentials',
    title: 'App Credentials',
    icon: 'smartphone',
    description: 'Mobile app access details',
    fields: [
      {
        id: 'appType',
        label: 'App Type',
        type: 'radio',
        required: false,
        options: ['Android', 'iOS', 'Both'],
      },
      {
        id: 'hasGooglePlayConsole',
        label: 'Do you have Google Play Console?',
        type: 'radio',
        required: false,
        options: ['Yes', 'No'],
      },
      {
        id: 'preferredAccessMethod',
        label: 'Preferred Access Method',
        type: 'radio',
        required: false,
        options: ['Share access via email', 'Provide login credentials'],
      },
      { id: 'accessEmail', label: 'Email (if access sharing)', type: 'email', required: false, placeholder: 'Email for access sharing' },
      { id: 'cmsLoginUsername', label: 'CMS Login Username', type: 'text', required: false, placeholder: 'CMS username' },
      { id: 'cmsLoginPassword', label: 'CMS Login Password', type: 'password', required: false, placeholder: 'CMS password' },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Credentials',
    icon: 'share',
    description: 'Social media account details',
    fields: [
      {
        id: 'platformsRequired',
        label: 'Platforms Required',
        type: 'checkbox',
        required: false,
        options: ['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube'],
      },
      { id: 'socialMediaHandles', label: 'Social Media Handles', type: 'textarea', required: false, placeholder: 'List your social media handles...' },
      { id: 'socialLoginEmail', label: 'Login Email', type: 'email', required: false, placeholder: 'Social media login email' },
      { id: 'socialPassword', label: 'Password', type: 'password', required: false, placeholder: 'Social media password' },
      {
        id: 'socialAccessMethod',
        label: 'Preferred Access Method',
        type: 'radio',
        required: false,
        options: ['Direct login', 'Business Manager access'],
      },
      { id: 'contentStylePreference', label: 'Content Style Preference', type: 'textarea', required: false, placeholder: 'Describe your preferred content style...' },
    ],
  },
  {
    id: 'youtube-access',
    title: 'YouTube Access',
    icon: 'play',
    description: 'YouTube channel details',
    fields: [
      { id: 'channelName', label: 'Channel Name', type: 'text', required: false, placeholder: 'Your YouTube channel name' },
      { id: 'channelUrl', label: 'Channel URL', type: 'url', required: false, placeholder: 'https://youtube.com/@yourchannel' },
      { id: 'googleAccountEmail', label: 'Google Account Email', type: 'email', required: false, placeholder: 'your-email@gmail.com' },
      { id: 'googleAccountPassword', label: 'Password', type: 'password', required: false, placeholder: 'Google account password' },
    ],
  },
  {
    id: 'ads-credentials',
    title: 'Ads Credentials',
    icon: 'target',
    description: 'Google Ads account details',
    fields: [
      { id: 'googleAdsCustomerId', label: 'Google Ads Customer ID', type: 'text', required: false, placeholder: 'e.g. 123-456-7890' },
      {
        id: 'adsAccessPreference',
        label: 'Access Preference',
        type: 'radio',
        required: false,
        options: ['Share access via email', 'Provide login credentials'],
      },
      { id: 'adsLoginEmail', label: 'Login Email', type: 'email', required: false, placeholder: 'Ads login email' },
      { id: 'adsPassword', label: 'Password', type: 'password', required: false, placeholder: 'Ads login password' },
    ],
  },
  {
    id: 'software-credentials',
    title: 'Software Credentials',
    icon: 'code',
    description: 'Software and API access details',
    fields: [
      { id: 'existingSoftwareUrl', label: 'Existing Software URL', type: 'url', required: false, placeholder: 'https://your-software.com' },
      { id: 'softwareAdminUrl', label: 'Admin Panel URL', type: 'url', required: false, placeholder: 'https://your-software.com/admin' },
      { id: 'softwareAdminUsername', label: 'Admin Username', type: 'text', required: false, placeholder: 'Admin username' },
      { id: 'softwareAdminPassword', label: 'Admin Password', type: 'password', required: false, placeholder: 'Admin password' },
      { id: 'apiKey', label: 'API Key', type: 'text', required: false, placeholder: 'Your API key' },
      { id: 'secretKey', label: 'Secret Key', type: 'password', required: false, placeholder: 'Your secret key' },
    ],
  },
  {
    id: 'design-requirements',
    title: 'Design Requirements',
    icon: 'palette',
    description: 'Branding and design preferences',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', required: false, placeholder: 'Your brand name' },
      { id: 'tagline', label: 'Tagline', type: 'text', required: false, placeholder: 'Your brand tagline' },
      { id: 'preferredColors', label: 'Preferred Colors', type: 'text', required: false, placeholder: 'e.g. Blue, #FF5733' },
      { id: 'referenceLinks', label: 'Reference Links', type: 'textarea', required: false, placeholder: 'Links to designs you like...' },
      { id: 'designIdea', label: 'Describe your idea', type: 'textarea', required: false, placeholder: 'Describe your design vision...' },
      { id: 'uploadFiles', label: 'Upload files if any', type: 'file', required: false, accept: '.pdf,.png,.jpg,.jpeg,.svg,.ai,.psd,.zip' },
    ],
  },
  {
    id: 'data-access',
    title: 'Data Access',
    icon: 'database',
    description: 'Data sources and analytics tools',
    fields: [
      {
        id: 'dataSource',
        label: 'Data Source',
        type: 'radio',
        required: false,
        options: ['Excel', 'CRM', 'Database', 'Other'],
      },
      {
        id: 'toolsUsed',
        label: 'Tools Used',
        type: 'radio',
        required: false,
        options: ['Google Analytics', 'Power BI', 'Tableau', 'CRM'],
      },
      { id: 'dataLoginEmail', label: 'Login Email', type: 'email', required: false, placeholder: 'Data tool login email' },
      { id: 'dataPassword', label: 'Password', type: 'password', required: false, placeholder: 'Data tool password' },
      {
        id: 'hasSearchConsoleAccess',
        label: 'Google Search Console Access',
        type: 'radio',
        required: false,
        options: ['Yes', 'No'],
      },
    ],
  },
];

// Build initial form data object from schema
export const getInitialFormData = () => {
  const data = {};
  SECTIONS.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        data[field.id] = [];
      } else if (field.type === 'file') {
        data[field.id] = null;
      } else {
        data[field.id] = '';
      }
    });
  });
  return data;
};

// Count total fields
export const TOTAL_FIELDS = SECTIONS.reduce((acc, s) => acc + s.fields.length, 0);
