import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Support</h1>
        
        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">General Support</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Welcome to the VoidNote support page. Here you can find answers to common questions and get help with various aspects of using our platform. Whether you need assistance with your account, technical support, or just want to learn more about our features, we’re here to help.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Account Management</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            If you need help managing your account, such as updating your profile information, changing your password, or verifying your email address, please visit our Account Management section. Here are some common issues and their solutions:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Updating Profile Information:</strong> Go to your profile page and click on the "Edit Profile" button to update your personal details.
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Changing Password:</strong> Navigate to the "Settings" page and select "Change Password" to update your password.
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Email Verification:</strong> If you haven’t received your verification email, please check your spam folder or click on "Resend Verification Email" on the login page.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Technical Support</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Encountering technical issues? Our technical support team is here to assist you. Below are some common technical issues and their troubleshooting steps:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Login Issues:</strong> Ensure that you are entering the correct email and password. If you’ve forgotten your password, use the "Forgot Password" link to reset it.
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Performance Problems:</strong> Clear your browser cache and cookies, and make sure you are using the latest version of your web browser.
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Feature Requests:</strong> We welcome feedback and suggestions! Please use our contact form to submit your ideas for new features or improvements.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Contact Us</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            If you can’t find the answer to your question or need further assistance, please don’t hesitate to contact us. Our support team is available to help you with any issues you may have. You can reach us via email at support@voidnote.com or by filling out our online contact form.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We aim to respond to all inquiries within 24 hours. Thank you for using VoidNote!
          </p>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
