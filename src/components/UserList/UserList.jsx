import InkNotice from '../InkNotice/InkNotice';
import sealImg from '../../assets/img/seal.png';
import './UserList.css';

const ROLE_LABELS = {
  admin: 'Mayordomo del reino',
  customer: 'Súbdito',
};

const UserList = ({ items = [], isLoading = false, onEdit, onDelete }) => {
  const handleAvatarError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = sealImg;
  };

  if (isLoading) {
    return (
      <InkNotice title="Abriendo el libro">
        El escribano copia los registros…
      </InkNotice>
    );
  }

  if (items.length === 0) {
    return (
      <InkNotice title="Libro en blanco">
        No hay súbditos inscritos en el registro.
      </InkNotice>
    );
  }

  return (
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
                      onClick={() => onEdit?.(user)}
                    >
                      Enmendar
                    </button>
                    <button
                      type="button"
                      className="inkButton inkButtonDanger"
                      aria-label={`Borrar el registro de ${user.name}`}
                      onClick={() => onDelete?.(user)}
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
  );
};

export default UserList;
