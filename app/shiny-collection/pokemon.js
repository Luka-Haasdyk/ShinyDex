export default function Pokemon({ name, id, shinySprite }) {
  return (
    <div className="pokemon-card bg-slate-700 shadow-md rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold capitalize">{name}</h2>
      <p className="text-sm text-gray-500">#{String(id).padStart(4, '0')}</p>
      <img
        src={shinySprite}
        alt={`${name} shiny`}
        className="w-24 h-24 mt-2"
      />
    </div>
  );
}
