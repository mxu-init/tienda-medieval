import { useEffect, useState } from 'react';
import { getUsers } from '../../services/userService';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import sealImg from '../../assets/img/seal.png';
import InkNotice from '../../components/InkNotice/InkNotice';
import '../home/Home.css';
import './Users.css';

const ROLE_LABELS = {
  admin: 'Mayordomo del reino',
  customer: 'Súbdito',
};

const Users = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    getUsers(controller.signal)
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setErrorMessage(err.message || 'No se pudo consultar el registro remoto.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const reloadUsers = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getUsers();
      setItems(data);
    } catch (err) {
      setErrorMessage(err.message || 'No se pudo consultar el registro remoto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = sealImg;
  };

  return (
    <div
      className="homeMedievalShell"
      style={{
        backgroundColor: 'oklch(0.19 0.012 60)',
        backgroundImage: `url(${stoneImg})`,
        backgroundSize: '620px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="homeOverlay">
        <div className="mobileHeraldry">
          <img
            src={bannerImg}
            alt="Estandarte con león rampante dorado"
            className="mobileBannerImg"
          />
          <img
            src={lanternImg}
            alt="Farol de latón"
            className="mobileLanternImg"
          />
        </div>

        <div className="homeLayoutBody">
          <aside className="leftRail">
            <img
              src={bannerImg}
              alt="Estandarte con león rampante dorado"
              className="leftRailBanner"
            />
            <span className="leftRailLanternGlow" />
            <img
              src={lanternImg}
              alt="Farol de latón"
              className="leftRailLantern"
            />
          </aside>

          <main
            className="parchmentPanel"
            style={{
              backgroundImage: `url(${parchmentImg})`,
              backgroundSize: '1600px',
              backgroundRepeat: 'repeat',
            }}
          >
            <div className="parchmentContent">
              <header className="pageHeader">
                <span aria-hidden="true" className="vellumWash" />
                <h1 className="pageTitle">Usuarios</h1>
                <div className="ornamentDivider">
                  <span className="inkRule" />
                  <svg
                    width="46"
                    height="12"
                    viewBox="0 0 46 12"
                    fill="none"
                    className="ornamentSvg"
                    aria-hidden="true"
                  >
                    <path
                      d="M23 1c2.4 0 3.6 1.8 3.6 3.4 0 1.6-1.2 2.6-2.4 2.6-1 0-1.8-.6-1.8-1.5 0-.8.6-1.3 1.2-1.3"
                      stroke="currentColor"
                      strokeWidth="0.9"
                    />
                    <path
                      d="M23 1c-2.4 0-3.6 1.8-3.6 3.4 0 1.6 1.2 2.6 2.4 2.6 1 0 1.8-.6 1.8-1.5 0-.8-.6-1.3-1.2-1.3"
                      stroke="currentColor"
                      strokeWidth="0.9"
                    />
                    <path d="M0 6h14M32 6h14" stroke="currentColor" strokeWidth="0.9" />
                    <path d="M15.5 4l2 2-2 2M30.5 4l-2 2 2 2" stroke="currentColor" strokeWidth="0.9" />
                  </svg>
                  <span className="inkRule" />
                </div>
              </header>

              <div className="vellumBox usersIntroBox">
                <p>
                  Libro de registro de los súbditos inscritos en el mercado del reino, copiado del
                  archivo de FakeAPI Platzi.
                </p>
              </div>

              <div className="usersActionBar">
                <button type="button" className="inkButton inkButtonSolid">
                  Inscribir súbdito
                </button>
                <button
                  type="button"
                  className="inkButton inkButtonOutline"
                  onClick={reloadUsers}
                >
                  Recargar
                </button>
              </div>

              {isLoading && (
  <InkNotice title="Abriendo el libro">
    El escribano copia los registros…
  </InkNotice>
)}

{errorMessage && !isLoading && (
  <InkNotice tone="error" title="El archivo no responde">
    {errorMessage}
  </InkNotice>
)}

              {!isLoading && items.length > 0 && (
                <div className="usersTableFrame">
                  <div className="usersTableScroll">
                    <table className="usersTable">
                      <caption className="srOnly">Registro de súbditos del mercado</caption>
                      <thead>
                        <tr>
                          <th scope="col">Retrato</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Rango</th>
                          <th scope="col">Sello</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((user, index) => (
                          <tr
                            key={user.id}
                            className={index % 2 === 1 ? 'usersTableRowAlt' : ''}
                          >
                            <td>
                              <img
                                src={user.avatar}
                                alt={`Retrato de ${user.name}`}
                                className="usersAvatar"
                                width={48}
                                height={48}
                                onError={handleAvatarError}
                              />
                            </td>
                            <td>{user.name}</td>
                            <td className="usersEmailCell">{user.email}</td>
                            <td className="usersRoleCell">
                              {ROLE_LABELS[user.role] ?? user.role}
                            </td>
                            <td>
                              <div className="usersTableActions">
                                <button
                                  type="button"
                                  className="inkButton inkButtonOutline"
                                  aria-label={`Enmendar el registro de ${user.name}`}
                                >
                                  Enmendar
                                </button>
                                <button
                                  type="button"
                                  className="inkButton inkButtonDanger"
                                  aria-label={`Borrar el registro de ${user.name}`}
                                >
                                  Borrar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="sealDividerWrapper">
                <div className="sealDivider">
                  <span className="inkRule dividerRule" />
                  <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                    <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                  </svg>
                  <img
                    src={sealImg}
                    alt="Sello de cera de Mercatum Regni"
                    className="sealImg"
                  />
                  <svg width="16" height="10" viewBox="0 0 16 10" className="dividerDiamond" aria-hidden="true">
                    <path d="M8 0l4 5-4 5-4-5z" fill="currentColor" opacity=".7" />
                  </svg>
                  <span className="inkRule dividerRule" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Users;