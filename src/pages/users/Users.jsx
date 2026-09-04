import { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userService';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import bannerImg from '../../assets/img/banner.png';
import lanternImg from '../../assets/img/lantern.png';
import sealImg from '../../assets/img/seal.png';
import InkNotice from '../../components/InkNotice/InkNotice';
import UserList from '../../components/UserList/UserList';
import UserModal from '../../components/UserModal/UserModal';
import UserForm from '../../components/UserForm/UserForm';
import '../home/Home.css';
import './Users.css';

const getModalTitle = (modalMode) => {
  if (modalMode === 'edit') {
    return 'Enmendar súbdito';
  }
  if (modalMode === 'delete') {
    return 'Borrar';
  }
  return 'Inscribir súbdito';
};

const Users = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setSuccessMessage('');
    try {
      const data = await getUsers();
      setItems(data);
    } catch (err) {
      setErrorMessage(err.message || 'No se pudo consultar el registro remoto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) {
      return;
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (modalMode === 'create') {
        const created = await createUser(formData);
        setItems((prev) => [created, ...prev]);
        setSuccessMessage('Súbdito inscrito en el libro del reino.');
      } else if (modalMode === 'edit' && selectedUser) {
        const updated = await updateUser(selectedUser.id, formData);
        setItems((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id ? { ...user, ...formData, ...updated } : user
          )
        );
        setSuccessMessage('Registro enmendado.');
      }
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteUser(selectedUser.id);
      setItems((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setSuccessMessage('Súbdito borrado del libro.');
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar el usuario.');
    } finally {
      setIsSubmitting(false);
    }
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
                  Libro de registro de los súbditos inscritos en el mercado del reino, conectado con nuestra propia API que hemos creado e implementado.
                </p>
              </div>

              <div className="usersActionBar">
                <button
                  type="button"
                  className="inkButton inkButtonSolid"
                  onClick={handleOpenCreate}
                >
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

              {successMessage && !isLoading && (
                <InkNotice tone="success" title="Aviso del escribano">
                  {successMessage}
                </InkNotice>
              )}

              {errorMessage && !isLoading && (
                <InkNotice tone="error" title="El archivo no responde">
                  {errorMessage}
                </InkNotice>
              )}

              {(!errorMessage || items.length > 0) && (
                <UserList
                  items={items}
                  isLoading={isLoading}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
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

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle(modalMode)}
      >
        {modalMode === 'delete' ? (
          <>
            <p className="userModalConfirmText">
              ¿Está seguro de que desea borrar el registro de {selectedUser?.name}?
            </p>
            <div className="userModalActions">
              <button
                type="button"
                className="inkButton inkButtonOutline"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inkButton inkButtonDanger"
                onClick={confirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sellando…' : 'Borrar'}
              </button>
            </div>
          </>
        ) : (
          <UserForm
            key={modalMode === 'create' ? 'create' : selectedUser?.id}
            mode={modalMode}
            initialData={selectedUser}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        )}
      </UserModal>
    </div>
  );
};

export default Users;
