import React from 'react';
import { Link } from 'react-router-dom';

interface IBreadcrumbProps {
  classnames?: string
  items: Array<{
    title: string
    link?: string
  }>
}

const ProBreadcrumb: React.FC<IBreadcrumbProps> = ({ items, classnames }) => {
  return (
    <nav className={`text-sm md:text-base py-4 ${classnames}`}>
      <ol className="list-none p-0 flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">&#8250;</span>} {/* Separator between items */}
            {index === items.length - 1 ? ( // Check if it's the last item
              <span className="font-medium text-gray-600">{item.title}</span>
            ) : (
              <Link to={item.link ?? "/"} className="text-primary-700 dark:text-neutral-200 hover:text-blue-800">
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProBreadcrumb;
