import { BookOpenIcon, Network, ClipboardListIcon, CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const features = [
  {
    title: 'note.title',
    description: 'note.description',
    imageSrc: '/note.jpg',
    align: 'left'
  },
  {
    title: 'treeNote.title',
    description: 'treeNote.description',
    imageSrc: '/tree.jpg',
    align: 'right'
  },
  {
    title: 'todoList.title',
    description: 'todoList.description',
    imageSrc: '/todo.jpg',
    align: 'left'
  },
  {
    title: 'calendarNote.title',
    description: 'calendarNote.description',
    imageSrc: '/calendar.jpg',
    align: 'right'
  },
];

const FeaturesPage: React.FC = () => {
  const t = useTranslations('features');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{t('description')}</p>
        <div className="flex justify-center space-x-4 text-gray-800 dark:text-gray-300">
          <BookOpenIcon className="w-8 h-8" />
          <Network className="w-8 h-8" />
          <ClipboardListIcon className="w-8 h-8" />
          <CalendarIcon className="w-8 h-8" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col md:flex-row ${feature.align === 'left' ? '' : 'md:flex-row-reverse'} items-center justify-between space-y-6 md:space-y-0`}>
            <div className="flex justify-center md:justify-start">
              <Image src={feature.imageSrc} alt={t(feature.title)} width={400} height={300} className="rounded-lg border-8 border-gray-300 dark:border-gray-600" />
            </div>
            <div className={`md:w-1/2 p-6 ${feature.align === 'left' ? 'text-left' : 'text-right'} text-lg text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg`}>
              <h2 className="text-2xl font-bold">{t(feature.title)}</h2>
              <p className="mt-2">{t(feature.description)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-4">{t('analyticsTitle')}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{t('analyticsDescription')}</p>
        <Image src="/graph.jpg" alt="Analytics Page" width={600} height={400} className="rounded-lg border-8 border-gray-300 dark:border-gray-600 mx-auto" />
        <div className="mt-8 text-left mx-auto max-w-4xl text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{t('recordingVariablesTitle')}</h3>
          <p className="mb-4">{t('recordingVariablesDescription')}</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
            <code>
              temp[20] <br />
              humidity[50] <br />
              temp[22] <br />
              pressure[1012]
            </code>
          </pre>
          <p className="mb-4">{t('visualizingVariablesDescription')}</p>
          <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <strong>{t('recordingVariablesNote')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
