import { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import './UserList.css';

const ITEMS_PER_PAGE = 8;

const UserList = ({ users, isLoading, onView, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmail = user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = matchesName || matchesEmail;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200';
  };

  if (isLoading) {
    return (
      <div className="userListLoading" role="status">
        <div className="spinnerIcon" aria-hidden="true" />
        <p>Cargando los registros de usuarios del reino...</p>
      </div>
    );
  }

  return (
    <section className="userListContainer">
      <div className="userListControls">
        <div className="filterGroup">
          <label htmlFor="searchUser" className="filterLabel">
            Buscar usuario:
          </label>
          <input
            id="searchUser"
            type="search"
            className="filterInput"
            placeholder="Buscar por nombre o correo..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filterGroup">
          <label htmlFor="roleFilter" className="filterLabel">
            Filtrar por rol:
          </label>
          <select
            id="roleFilter"
            className="filterSelect"
            value={roleFilter}
            onChange={handleRoleChange}
          >
            <option value="all">Todos los roles</option>
            <option value="customer">Clientes</option>
            <option value="admin">Administradores</option>
          </select>
        </div>

        <div className="viewToggleGroup">
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'grid' ? 'activeView' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista de cuadrícula"
            aria-label="Vista de cuadrícula"
          >
            Tarjetas
          </button>
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'table' ? 'activeView' : ''}`}
            onClick={() => setViewMode('table')}
            title="Vista de lista"
            aria-label="Vista de lista"
          >
            Tabla
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="userListEmpty">
          <p>No se encontraron registros de usuarios que coincidan con el criterio.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="userGrid">
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="tableWrapper">
          <table className="userTable">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Avatar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="tableId">#{user.id}</td>
                  <td>
                    <img
                      src={user.avatar}
                      alt={`Avatar de ${user.name}`}
                      className="tableAvatar"
                      onError={handleAvatarError}
                    />
                  </td>
                  <td className="tableName">{user.name}</td>
                  <td className="tableEmail">{user.email}</td>
                  <td>
                    <span className={`tableRoleBadge ${user.role === 'admin' ? 'roleAdmin' : 'roleCustomer'}`}>
                      {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </td>
                  <td>
                    <div className="tableActions">
                      <button
                        type="button"
                        className="tableBtn btnView"
                        onClick={() => onView(user)}
                        title={`Ver ${user.name}`}
                        aria-label={`Ver ${user.name}`}
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnEdit"
                        onClick={() => onEdit(user)}
                        title={`Editar ${user.name}`}
                        aria-label={`Editar ${user.name}`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnDelete"
                        onClick={() => onDelete(user)}
                        title={`Eliminar ${user.name}`}
                        aria-label={`Eliminar ${user.name}`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="paginationNav" aria-label="Navegación de páginas">
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </button>
          <span className="paginationInfo">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  );
};

export default UserList;
