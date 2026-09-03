import { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import sealImg from '../../assets/img/seal.png';
import './UserList.css';

const ITEMS_PER_PAGE = 8;

const ROLE_LABELS = {
  admin: 'Mayordomo del reino',
  customer: 'Súbdito',
};

const UserList = ({ users = [], items = [], isLoading = false, onView, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Retrocompatibilidad con ambas ramas: acepta prop 'users' o 'items'
  const allUsers = users && users.length > 0 ? users : items || [];

  const filteredUsers = allUsers.filter((user) => {
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
    e.target.src = sealImg;
  };

  if (isLoading) {
    return (
      <div className="userListLoading" role="status">
        <div className="spinnerIcon" aria-hidden="true" />
        <p>El escribano consulta los registros del reino…</p>
      </div>
    );
  }

  return (
    <section className="userListContainer">
      <div className="userListControls">
        <div className="filterGroup">
          <label htmlFor="searchUser" className="filterLabel">
            Buscar súbdito / usuario:
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
            Filtrar por rango:
          </label>
          <select
            id="roleFilter"
            className="filterSelect"
            value={roleFilter}
            onChange={handleRoleChange}
          >
            <option value="all">Todos los rangos</option>
            <option value="customer">Súbditos (Clientes)</option>
            <option value="admin">Mayordomos (Administradores)</option>
          </select>
        </div>

        <div className="viewToggleGroup">
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'grid' ? 'activeView' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista de cuadrícula con tarjetas"
            aria-label="Vista de cuadrícula"
          >
            Tarjetas
          </button>
          <button
            type="button"
            className={`viewToggleBtn ${viewMode === 'table' ? 'activeView' : ''}`}
            onClick={() => setViewMode('table')}
            title="Vista de tabla pergamino"
            aria-label="Vista de tabla"
          >
            Tabla
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="userListEmpty">
          <p>No se encontraron registros de usuarios que coincidan con la búsqueda.</p>
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
        <div className="tableWrapper usersTableFrame">
          <table className="userTable usersTable">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Retrato</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rango</th>
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
                      alt={`Retrato de ${user.name}`}
                      className="tableAvatar usersAvatar"
                      onError={handleAvatarError}
                    />
                  </td>
                  <td className="tableName">{user.name}</td>
                  <td className="tableEmail usersEmailCell">{user.email}</td>
                  <td>
                    <span
                      className={`tableRoleBadge ${
                        user.role === 'admin' ? 'roleAdmin' : 'roleCustomer'
                      }`}
                    >
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </td>
                  <td>
                    <div className="tableActions usersTableActions">
                      <button
                        type="button"
                        className="tableBtn btnView"
                        onClick={() => onView?.(user)}
                        title={`Ver detalles de ${user.name}`}
                        aria-label={`Ver detalles de ${user.name}`}
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnEdit"
                        onClick={() => onEdit?.(user)}
                        title={`Enmendar registro de ${user.name}`}
                        aria-label={`Enmendar registro de ${user.name}`}
                      >
                        Enmendar
                      </button>
                      <button
                        type="button"
                        className="tableBtn btnDelete"
                        onClick={() => onDelete?.(user)}
                        title={`Borrar registro de ${user.name}`}
                        aria-label={`Borrar registro de ${user.name}`}
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
      )}

      {totalPages > 1 && (
        <nav className="paginationNav" aria-label="Navegación de páginas de usuarios">
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ← Anterior
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
            Siguiente →
          </button>
        </nav>
      )}
    </section>
  );
};

export default UserList;
