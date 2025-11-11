
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cardClasses = `
    bg-white/50 dark:bg-gray-800/50 
    backdrop-blur-xl 
    border border-white/20 dark:border-gray-700/50 
    rounded-2xl 
    shadow-lg dark:shadow-2xl dark:shadow-black/20
    transition-all duration-300
    ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
