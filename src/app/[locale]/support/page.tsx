import { useTranslations } from 'next-intl';
import React from 'react';

const SupportPage: React.FC = () => {
  const t = useTranslations('support');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{t('generalSupportTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t('generalSupportText')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{t('accountManagementTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t('accountManagementText')}
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Updating Profile Information:</strong> {t('accountManagementText')}
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Changing Password:</strong> {t('accountManagementText')}
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Email Verification:</strong> {t('accountManagementText')}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{t('technicalSupportTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t('technicalSupportTitle')}
          </p>
          <ul className="list-disc list-inside ml-4">
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Login Issues:</strong> {t('technicalSupportText')}
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Performance Problems:</strong> {t('performanceProblems')}
            </li>
            <li className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Feature Requests:</strong> {t('featureRequests')}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{t('contactUsTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t('contactUsText')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
