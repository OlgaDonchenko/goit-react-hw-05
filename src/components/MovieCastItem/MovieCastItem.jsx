export default function MovieCastItem({
  data: { profile_path, name, character },
}) {
  const urlImg = `https://image.tmdb.org/t/p/original/${profile_path}`;
  return (
    <div>
      <img src={urlImg} alt={name} width="200" height="300" />
      <div>
        <h3>{name}</h3>
        <p>Character: {character}</p>
      </div>
    </div>
  );
}
