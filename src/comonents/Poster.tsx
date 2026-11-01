import React from 'react';

interface Movie {
   id: string;
   title: string;
   poster: string;
   year: string;
   genre: string;
   description: string;
}

interface PosterProps {
   movie: Movie;
   isActive?: boolean;
   onClick?: (id: string) => void;
}

export const Poster: React.FC<PosterProps> = ({ movie, isActive = false, onClick }) => {
   return (
      <div
         onClick={() => onClick && onClick(movie.id)}
               style={{
        position: 'relative',
        width: '100%',
        height: '100%', // Постер всегда занимает всю высоту, которую ему выделил родитель
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: isActive
          ? '0 0 0 4px #ff4757, 0 12px 24px rgba(255, 71, 87, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: isActive ? 'scale(0.96)' : 'scale(1)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none'
      }}

      >
         <img
            src={movie.poster}
            alt={movie.title}
            style={{
               width: '100%',
               height: '100%',
               objectFit: 'cover'
            }}
         />
         <div
            style={{
               position: 'absolute',
               bottom: 0,
               left: 0,
               right: 0,
               background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 100%)',
               padding: '24px 12px 12px 12px'
            }}
         >
            <h4 style={{
               margin: 0,
               fontSize: '14px',
               fontWeight: 600,
               color: '#ffffff',
               lineHeight: '1.3',
               textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
               {movie.title}
            </h4>
         </div>
      </div>
   );
};
