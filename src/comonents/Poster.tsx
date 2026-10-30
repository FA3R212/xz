import type { Movie } from "../model"

function Poster({ movie, small = false }: {movie: Movie; small?: boolean }) {
    return (
        <div
         className={`poster poster--${movie.id}${small ? " poster--small" : ""}`}
         style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : {}}
      >
         {!movie.poster && (
            <div className="poster__fallback">
               <span className="poster__shape">✦</span>
               <strong>{movie.title}</strong>
               <small>
                  {movie.year} · {movie.genre}
               </small>
            </div>
         )}
      </div>
    )
}
export { Poster }