import { Link } from "react-router-dom";

export default function Menu() {
  // const location = useLocation();

  return (
    <div className="flex items-center justify-center py-8">
      <ul className="flex flex-col items-center justify-between min-h-[250px]">
        <li className="border-b border-gray-300 my-8 uppercase">
          <Link
            to={{ pathname: "/home" }}
            state={{ from: location.pathname }}
          >
            Etusivu
          </Link>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <Link
            to={{ pathname: "/camera" }}
            state={{ from: location.pathname }}
          >
            Kamera
          </Link>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <Link
            to={{ pathname: "/evals" }}
            state={{ from: location.pathname }}
          >
            Tunnistetut tuotteet
          </Link>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <Link
            to={{ pathname: "/reviewed" }}
            state={{ from: location.pathname }}
          >
            Käsitellyt tuotteet
          </Link>
        </li>
        <li className="border-b border-gray-300 my-8 uppercase">
          <Link
            to={{ pathname: "/archive" }}
            state={{ from: location.pathname }}
          >
            Arkisto
          </Link>
        </li>
      </ul>
    </div>
  );
}
