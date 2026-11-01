import React, { useState } from 'react';
import data from '../data.json';
import { Poster } from '../comonents/Poster';
import { readSession, matches as getMatches } from '../model';

interface Movie {
   id: string;
   title: string;
   poster: string;
   year: string;
   genre: string;
   description: string;
}

const chunkArray = (array: any[], size: number) => {
   const result = [];
   for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
   }
   return result;
};

export const ResultPage: React.FC = () => {
   const [activeTab, setActiveTab] = useState<'matches' | 'all'>('matches');
   const [activeMovieId, setActiveMovieId] = useState<string | null>(null);

   // Считываем реальную сессию из localStorage через модель
   const session = readSession();

   // Извлекаем реальные имена пользователей на основе структуры сессии
   const user1Name = session?.first?.name || 'Пользователь 1';
   const user2Name = session?.name || 'Пользователь 2';

   // Устанавливаем первого пользователя по умолчанию
   const [selectedUser, setSelectedUser] = useState<string>(user1Name);

   // Вычисляем массивы ID лайков строго по вашей бизнес-логике
   const user1LikesIds = session?.first?.likes || [];
   const user2LikesIds = session?.votes?.filter((v) => v.liked).map((v) => v.id) || [];

   // Вычисляем ID совпадений через вашу родную функцию matches
   const matchesIds = getMatches(user1LikesIds, user2LikesIds);

   // Фильтруем полные объекты завтраков из data.json
   const matchedMovies = data.filter(item => matchesIds.includes(item.id)) as Movie[];
   const user1Likes = data.filter(item => user1LikesIds.includes(item.id)) as Movie[];
   const user2Likes = data.filter(item => user2LikesIds.includes(item.id)) as Movie[];

   const getDisplayData = (): Movie[] => {
      if (activeTab === 'matches') {
         return matchedMovies;
      }
      return selectedUser === user1Name ? user1Likes : user2Likes;
   };

   const currentItems = getDisplayData();

   const handleCardClick = (id: string) => {
      setActiveMovieId(prevId => prevId === id ? null : id);
   };

   const handleTabChange = (tab: 'matches' | 'all') => {
      setActiveTab(tab);
      setActiveMovieId(null);
   };

   const rows = chunkArray(currentItems, 2);

   return (
      <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>

         {/* Вкладки: Совпадения / Все результаты */}
         <div style={{ display: 'flex', borderBottom: '2px solid #f1f2f6', marginBottom: '16px' }}>
            <button
               onClick={() => handleTabChange('matches')}
               style={{
                  flex: 1,
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'matches' ? '3px solid #ff4757' : '3px solid transparent',
                  color: activeTab === 'matches' ? '#ff4757' : '#57606f',
                  fontWeight: activeTab === 'matches' ? 'bold' : 'normal',
                  cursor: 'pointer'
               }}
            >
               Совпадения ({matchedMovies.length})
            </button>
            <button
               onClick={() => handleTabChange('all')}
               style={{
                  flex: 1,
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'all' ? '3px solid #ff4757' : '3px solid transparent',
                  color: activeTab === 'all' ? '#ff4757' : '#57606f',
                  fontWeight: activeTab === 'all' ? 'bold' : 'normal',
                  cursor: 'pointer'
               }}
            >
               Все результаты
            </button>
         </div>

         {/* Переключение кнопок по реальным именам игроков */}
         {activeTab === 'all' && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
               <button
                  onClick={() => { setSelectedUser(user1Name); setActiveMovieId(null); }}
                  style={{
                     padding: '8px 16px',
                     borderRadius: '20px',
                     border: '1px solid #ced6e0',
                     background: selectedUser === user1Name ? '#ff4757' : '#fff',
                     color: selectedUser === user1Name ? '#fff' : '#2f3542',
                     cursor: 'pointer',
                     fontSize: '14px',
                     fontWeight: selectedUser === user1Name ? '600' : 'normal',
                     transition: 'all 0.2s ease'
                  }}
               >
                  {user1Name}
               </button>
               <button
                  onClick={() => { setSelectedUser(user2Name); setActiveMovieId(null); }}
                  style={{
                     padding: '8px 16px',
                     borderRadius: '20px',
                     border: '1px solid #ced6e0',
                     background: selectedUser === user2Name ? '#ff4757' : '#fff',
                     color: selectedUser === user2Name ? '#fff' : '#2f3542',
                     cursor: 'pointer',
                     fontSize: '14px',
                     fontWeight: selectedUser === user2Name ? '600' : 'normal',
                     transition: 'all 0.2s ease'
                  }}
               >
                  {user2Name}
               </button>
            </div>
         )}

         {/* Адаптивная сетка карточек */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {rows.map((row, rowIndex) => {
               const activeMovieInRow = row.find(item => item.id === activeMovieId);

               return (
                  <div key={rowIndex} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                     <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px'
                     }}>
                        {row.map((movie) => (
                           <Poster
                              key={movie.id}
                              movie={movie}
                              isActive={activeMovieId === movie.id}
                              onClick={handleCardClick}
                           />
                        ))}
                     </div>

                     {/* Раскрывающийся текстовый блок описания завтрака под текущим рядом */}
                     {activeMovieInRow && (
                        <div style={{
                           width: '100%',
                           background: '#f8f9fa',
                           borderRadius: '12px',
                           padding: '16px',
                           boxSizing: 'border-box',
                           borderLeft: '4px solid #ff4757',
                           animation: 'slideDown 0.2s ease-out',
                           boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                           <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2f3542', fontWeight: 600 }}>
                              {activeMovieInRow.title}
                           </h4>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', lineHeight: '1.4', color: '#57606f' }}>
                              <div>
                                 <strong style={{ color: '#2f3542' }}>Ингредиенты:</strong> {activeMovieInRow.genre}
                              </div>
                              <div>
                                 <strong style={{ color: '#2f3542' }}>Рецепт приготовления:</strong> {activeMovieInRow.description}
                              </div>
                           </div>
                        </div>
                     )}

                  </div>
               );
            })}
         </div>

         <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      </div>
   );
};
