import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 md:px-10 pt-32 pb-16">
      <h1 className="text-4xl font-normal mb-4">Terms and Conditions</h1>
      <p className="text-gray-700">
        Welcome to our Software Marketplace platform. By using this website, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our platform.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">1. Registration and Account Security</h2>
      <p className="text-gray-700">
        To access certain features of our platform, you may be required to register for an account. You are responsible for maintaining the security of your account credentials and agree not to share your login information with others.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">2. Project Listing and Transactions</h2>
      <p className="text-gray-700">
        Developers are solely responsible for the accuracy and legality of the projects listed on our platform. Buyers are advised to conduct due diligence before making any transactions. We do not guarantee the quality or performance of listed projects.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">3. User Conduct</h2>
      <p className="text-gray-700">
        Users agree to use our platform in compliance with applicable laws and regulations. Any misuse, abuse, or violation of our terms may result in account suspension or termination.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">4. Privacy Policy</h2>
      <p className="text-gray-700">
        Our privacy policy governs the collection, use, and disclosure of user information. By using our platform, you consent to the terms outlined in our privacy policy.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">5. Intellectual Property Rights</h2>
      <p className="text-gray-700">
        All content, logos, and trademarks on our platform are the property of their respective owners. Users must respect intellectual property rights and refrain from unauthorized use or reproduction.
      </p>
      <h2 className="text-xl font-medium mt-8 mb-4">6. Limitation of Liability</h2>
      <p className="text-gray-700">
        We are not liable for any damages or losses resulting from the use of our platform, including but not limited to financial losses, data breaches, or system downtime. Users use our platform at their own risk.
      </p>
      {/* Add more terms and conditions as needed */}
    </div>
  );
};

export default TermsAndConditions;
