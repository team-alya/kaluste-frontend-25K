export default function Menu() {
  return (
    <div className="flex items-center justify-center py-8">
      <ul className="flex flex-col items-center justify-between min-h-[250px]">
        <li className="border-b border-gray-300 my-8 uppercase">
          <a href="/home">Etusivu</a>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <a href="/camera">Kamera</a>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <a href="/evals">Tunnistetut tuotteet</a>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <a href="/reviewed">Käsitellyt tuotteet</a>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <a href="/archive">Arkisto</a>
        </li>
      </ul>
    </div>
  );
}
