const Footer = () => {
    return (
      <footer className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} VoidNote. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  