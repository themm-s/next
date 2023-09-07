import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons/faFaceLaugh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar({ content }: { content: React.ReactNode; }) {
  return (
    <>
      <aside className="inset-0 fixed top-0 left-0 z-40 p-2 h-screen w-96 font-bold">
        <ul className="mt-72 space-y-6">
          <a href="/dashboard"><FontAwesomeIcon icon={faFileLines} className="w-6 text-center" />Панель</a>
          <a href="/perfomance"><FontAwesomeIcon icon={faChartSimple} className="w-6 text-center" />Производительность</a>
          <a href="/followers" className="mb-72"><FontAwesomeIcon icon={faFaceLaugh} className="w-6 text-center" />Пользователи</a>
          <hr />
          <a href="/apanel"><FontAwesomeIcon icon={faChartPie} className="w-6 text-center" />Админ панель</a>
        </ul>
      </aside>
      <div className="ml-96 p-4">{content}</div>
    </>
  );
}