import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, reviewsCount, size = 'sm', interactive = false, onRatingChange }) {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex;
          const half = !filled && rating >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              type={interactive ? 'button' : undefined}
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starIndex)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} p-0.5`}
              aria-label={`${starIndex} star`}
            >
              <Star
                className={`${sizeClass} ${
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : half
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-zinc-600'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {rating !== undefined && (
        <span className="text-xs font-semibold text-zinc-300">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-zinc-500">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
