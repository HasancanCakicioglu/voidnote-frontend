import { useTranslations } from 'next-intl';
import React from 'react';

const AboutPage: React.FC = () => {
  const t = useTranslations('about');

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {t('title')}
        </h1>
        <div className="text-lg text-gray-800 dark:text-gray-300">
          <p className="mb-4">
            {t('paragraph1')}
          </p>
          <p className="mb-4">
            {t('paragraph2')}
          </p>
          <p className="mb-4">
            {t('paragraph3')}
          </p>
          <p>
            {t('paragraph4')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
