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
          setUsers(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setErrorMessage(err.message || 'Error al conectar con los registros del reino.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenView = (user) => {
    setSelectedUser(user);
    setModalMode('view');
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
    if (isSubmitting) return;
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      if (modalMode === 'create') {
        const newUser = await createUser(formData);
        setUsers((prev) => [newUser, ...prev]);
        setSuccessMessage(`El usuario "${newUser.name}" fue creado exitosamente.`);
      } else if (modalMode === 'edit' && selectedUser) {
        const updated = await updateUser(selectedUser.id, formData);
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updated } : u))
        );
        setSuccessMessage(`Los datos de "${updated.name || selectedUser.name}" han sido actualizados.`);
      }
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSuccessMessage(`El usuario "${selectedUser.name}" ha sido eliminado del registro.`);
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar el usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200';
  };

  return (
    <div
      className="usersPageShell"
      style={{
        backgroundColor: 'oklch(0.19 0.012 60)',
        backgroundImage: `url(${stoneImg})`,
        backgroundSize: '620px',
        backgroundRepeat: 'repeat',
      }}
    >
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
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="formBtn btnDeleteConfirm"
                onClick={confirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        )}
      </UserModal>
    </div>
  );
};

export default Users;
