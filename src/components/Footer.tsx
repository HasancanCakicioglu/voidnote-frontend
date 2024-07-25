import React from 'react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">{t('footerText')}</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-400">
                  {t('termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
