import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingProps {
  value: number;
  max?: number;
}

const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  return (
    <div className='flex'>
      {[...Array(max)].map((_, index) => (
        <span key={index}>
          {index < value ? (
            <StarIcon className='w-5 h-5 text-yellow-500' />
          ) : (
            <StarOutlineIcon className='w-5 h-5 text-gray-300' />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
