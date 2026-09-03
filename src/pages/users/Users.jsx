<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import UserList from '../../components/UserList/UserList';
import UserForm from '../../components/UserForm/UserForm';
import UserModal from '../../components/UserModal/UserModal';
import stoneImg from '../../assets/img/stone.jpg';
import parchmentImg from '../../assets/img/parchment.jpg';
import sealImg from '../../assets/img/seal.png';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
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
<<<<<<< HEAD
          setItems(data);
=======
          setUsers(data);
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && err.name !== 'CanceledError' && err.name !== 'AbortError') {
<<<<<<< HEAD
          setErrorMessage(err.message || 'No se pudo consultar el registro remoto.');
=======
          setErrorMessage(err.message || 'Error al conectar con los registros del reino.');
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

<<<<<<< HEAD
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

=======
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
  const handleOpenCreate = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

<<<<<<< HEAD
=======
  const handleOpenView = (user) => {
    setSelectedUser(user);
    setModalMode('view');
    setIsModalOpen(true);
  };

>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
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
<<<<<<< HEAD
    if (isSubmitting) {
      return;
    }
=======
    if (isSubmitting) return;
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
<<<<<<< HEAD

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
=======
    try {
      if (modalMode === 'create') {
        const newUser = await createUser(formData);
        if (newUser) {
          setUsers((prev) => [newUser, ...prev]);
          setSuccessMessage(`El usuario "${newUser.name}" fue creado exitosamente.`);
        }
      } else if (modalMode === 'edit' && selectedUser) {
        const updated = await updateUser(selectedUser.id, formData);
        if (updated) {
          setUsers((prev) =>
            prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updated } : u))
          );
          setSuccessMessage(`Los datos de "${updated.name || selectedUser.name}" han sido actualizados.`);
        }
      }
      setIsModalOpen(false);
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
<<<<<<< HEAD
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
=======
    if (!selectedUser) return;
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSuccessMessage(`El usuario "${selectedUser.name}" ha sido eliminado del registro.`);
      setIsModalOpen(false);
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar el usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
  return (
    <div
      className="homeMedievalShell"
=======
  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200';
  };

  return (
    <div
      className="usersPageShell"
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
      style={{
        backgroundColor: 'oklch(0.19 0.012 60)',
        backgroundImage: `url(${stoneImg})`,
        backgroundSize: '620px',
        backgroundRepeat: 'repeat',
      }}
    >
<<<<<<< HEAD
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
=======
      <div className="usersPageOverlay">
        <main
          className="usersParchmentPanel"
          style={{
            backgroundImage: `url(${parchmentImg})`,
            backgroundSize: '1600px',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="usersParchmentContent">
            <header className="usersPageHeader">
              <span aria-hidden="true" className="vellumWash" />
              <h1 className="usersPageTitle">Registro de Usuarios del Reino</h1>
              <p className="usersPageSubtitle">
                Gestión centralizada de habitantes, caballeros y artesanos registrados.
              </p>
              <div className="ornamentDivider">
                <span className="inkRule" />
                <img src={sealImg} alt="Sello real del reino" className="headerSealIcon" />
                <span className="inkRule" />
              </div>
            </header>

            {successMessage && (
              <div className="alertBox alertSuccess" role="alert">
                <span className="alertIcon">✓</span>
                <p>{successMessage}</p>
                <button
                  type="button"
                  className="alertDismissBtn"
                  onClick={() => setSuccessMessage('')}
                  aria-label="Cerrar notificación"
                >
                  ✕
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="alertBox alertError" role="alert">
                <span className="alertIcon">⚠</span>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="alertDismissBtn"
                  onClick={() => setErrorMessage('')}
                  aria-label="Cerrar error"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="usersActionBar">
              <button
                type="button"
                className="createBtn"
                onClick={handleOpenCreate}
              >
                + Registrar nuevo usuario
              </button>
            </div>

            <UserList
              users={users}
              isLoading={isLoading}
              onView={handleOpenView}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        </main>
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
<<<<<<< HEAD
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
=======
        title={
          modalMode === 'create'
            ? 'Nuevo Usuario'
            : modalMode === 'edit'
              ? 'Editar Usuario'
              : modalMode === 'view'
                ? 'Detalles del Usuario'
                : 'Confirmar Eliminación'
        }
      >
        {(modalMode === 'create' || modalMode === 'edit') && (
          <UserForm
            key={selectedUser?.id || 'new'}
            initialData={modalMode === 'edit' ? selectedUser : null}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        )}

        {modalMode === 'view' && selectedUser && (
          <article className="userViewDetail">
            <div className="detailAvatarWrapper">
              <img
                src={selectedUser.avatar}
                alt={`Retrato de ${selectedUser.name}`}
                className="detailAvatarImg"
                onError={handleAvatarError}
              />
            </div>
            <div className="detailInfoGroup">
              <h3 className="detailName">{selectedUser.name}</h3>
              <p className="detailEmail">
                <strong>Correo:</strong> {selectedUser.email}
              </p>
              <p className="detailRole">
                <strong>Rol:</strong>{' '}
                <span className="roleTag">
                  {selectedUser.role === 'admin' ? 'Administrador' : 'Cliente'}
                </span>
              </p>
              <p className="detailId">
                <strong>ID de Registro:</strong> #{selectedUser.id}
              </p>
            </div>
            <div className="detailActions">
              <button
                type="button"
                className="formBtn btnSecondary"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </div>
          </article>
        )}

        {modalMode === 'delete' && selectedUser && (
          <div className="deleteConfirmBox">
            <p className="deleteText">
              ¿Está seguro de que desea eliminar permanentemente al usuario{' '}
              <strong>{selectedUser.name}</strong> del registro real?
            </p>
            <div className="formActions">
              <button
                type="button"
                className="formBtn btnSecondary"
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
<<<<<<< HEAD
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
=======
                className="formBtn btnDeleteConfirm"
                onClick={confirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
        )}
      </UserModal>
    </div>
  );
};

export default Users;
