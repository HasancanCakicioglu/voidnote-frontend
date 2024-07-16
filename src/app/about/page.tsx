import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          About VoidNote
        </h1>
        <div className="text-lg text-gray-800 dark:text-gray-300">
          <p className="mb-4">
            Welcome to VoidNote, where innovation meets productivity. We are dedicated
            to revolutionizing the way you organize your thoughts and tasks.
          </p>
          <p className="mb-4">
            At VoidNote, our mission is simple yet ambitious: to empower individuals
            and teams to achieve more through intuitive note-taking solutions. Whether
            you're a student, professional, or creative thinker, VoidNote is designed
            to elevate your productivity and creativity.
          </p>
          <p className="mb-4">
            Join us on this journey to transform how you capture ideas and streamline
            your workflow. Discover the limitless possibilities of structured note-taking
            with VoidNote.
          </p>
          <p>
            Let VoidNote be your partner in turning ideas into reality, effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
