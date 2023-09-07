import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons/faFaceLaugh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <>
      <nav className="p-2 h-screen w-80 font-bold">
        <ul className="mt-72 pl-5 space-y-6">
          <li><a href="/dashboard"><FontAwesomeIcon icon={faFileLines} className="w-5 text-center" />Dashboard</a></li>
          <li><a href="/perfomance"><FontAwesomeIcon icon={faChartSimple} className="w-5 text-center" />Shot Perfomance</a></li>
          <li><a href="/followers"><FontAwesomeIcon icon={faFaceLaugh} className="w-5 text-center" />Followers</a></li>
          <li><a href="/apanel"><FontAwesomeIcon icon={faChartPie} className="w-5 text-center" />Admin Panel</a></li>
        </ul>
      </nav >
    </>
  );
}