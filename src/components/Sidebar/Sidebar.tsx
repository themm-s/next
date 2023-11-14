import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons/faFaceLaugh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/index";
import { setUsers } from "@/store/Reducers/userLogin";

export default function Sidebar({ content }: { content: React.ReactNode; }) {
  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();
  const [storage, setStorage] = useState<string | null>(null);
  const displayName = useSelector((state: any) => state.login.user?.displayName);

  const setUser = (payload: any) => {
    dispatch(setUsers(payload));
  };

  useEffect(() => setStorage(localStorage?.getItem('user')), []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setUsers(null));
      localStorage.removeItem('user');
      window.location.href = '/pages/login';
    }).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user);
        localStorage.setItem('user', 'true');
        setUser(user);
      } else {
        setAuthUser(null);
        setUser(null);
      }
      return () => {
        listen();
      };
    });
  }, []);

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

  return (
    <>
      <aside className="inset-0 fixed top-0 left-0 z-40 p-2 h-screen w-96 font-bold">
        <ul className="mt-72 space-y-6">
          {storage ? (
            <p className="text-center">Здравствуйте {displayName}</p>
          ) : (
            <a href="/pages/login" className="justify-center">Логин</a>
          )}
          <hr />
          <a href="/pages/dashboard"><FontAwesomeIcon icon={faFileLines} className="w-6 text-center" />Панель</a>
          <a href="/pages/perfomance"><FontAwesomeIcon icon={faChartSimple} className="w-6 text-center" />Производительность</a>
          <a href="/pages/followers" className="mb-72"><FontAwesomeIcon icon={faFaceLaugh} className="w-6 text-center" />Пользователи</a>
          {authUser ? (
            <>
              <hr />
              <a href="/pages/apanel"><FontAwesomeIcon icon={faChartPie} className="w-6 text-center" />
                Админ панель
              </a>
              {!authUser ? null : <button className="text-center justify-center" onClick={userSignOut}>Выйти из аккаунта</button>}
            </>
          ) : null}
        </ul>
      </aside>
      <div className="ml-96 p-4">{content}</div>
    </>
  );
}