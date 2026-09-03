import { useState, useEffect, useRef } from 'react';
import UserList from '../../components/UserList/UserList';
import UserModal from '../../components/UserModal/UserModal';
import UserForm from '../../components/UserForm/UserForm';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userService';
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
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'view' | 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    getUsers(controller.signal)
      .then((data) => {
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : []);
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

  const reloadUsers = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    getUsers(controller.signal)
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setErrorMessage(err.message || 'Error al conectar con los registros del reino.');
          setIsLoading(false);
        }
      });
  };

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
        setSuccessMessage(`El súbdito "${newUser.name}" fue inscrito exitosamente en el reino.`);
      } else if (modalMode === 'edit' && selectedUser) {
        const updated = await updateUser(selectedUser.id, formData);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, ...formData, ...updated } : u
          )
        );
        setSuccessMessage(`Los datos de "${updated.name || selectedUser.name}" han sido enmendados.`);
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
    if (!selectedUser) return;
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSuccessMessage(`El registro de "${selectedUser.name}" ha sido borrado del libro.`);
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar el usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = sealImg;
  };

  const getModalTitle = (mode) => {
    switch (mode) {
      case 'create':
        return 'Inscribir Nuevo Usuario';
      case 'edit':
        return 'Enmendar Usuario';
      case 'view':
        return 'Detalles del Usuario';
      case 'delete':
        return 'Confirmar Eliminación';
      default:
        return 'Registro de Usuario';
    }
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
                + Inscribir súbdito
              </button>
              <button
                type="button"
                className="reloadBtn"
                onClick={reloadUsers}
                title="Recargar los registros del reino"
              >
                ↺ Recargar registros
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
        title={getModalTitle(modalMode)}
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
                <strong>Rango / Rol:</strong>{' '}
                <span className="roleTag">
                  {selectedUser.role === 'admin'
                    ? 'Mayordomo del reino (Administrador)'
                    : 'Súbdito (Cliente)'}
                </span>
              </p>
              <p className="detailId">
                <strong>ID de Registro:</strong> #{selectedUser.id}
              </p>
            </div>
            <div className="detailActions">
              <button
                type="button"
                className="formBtn btnPrimary"
                onClick={() => handleOpenEdit(selectedUser)}
              >
                Enmendar
              </button>
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
              ¿Está seguro de que desea borrar el registro del súbdito{' '}
              <strong>{selectedUser.name}</strong> del libro real?
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
                {isSubmitting ? 'Borrando…' : 'Sí, Borrar'}
              </button>
            </div>
          </div>
        )}
      </UserModal>
    </div>
  );
};

export default Users;
