import './UserCard.css';

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  if (!user) {
    return null;
  }

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200';
  };

  const translateRole = (role) => {
    if (role === 'admin') {
      return 'Administrador';
    }
    return 'Cliente';
  };

  return (
    <article className="userCardParchment">
      <div className="userCardBadge">#{user.id}</div>
      <div className="userAvatarWrapper">
        <img
          src={user.avatar}
          alt={`Retrato de ${user.name}`}
          className="userAvatarImg"
          onError={handleAvatarError}
        />
      </div>
      <div className="userCardContent">
        <h3 className="userName">{user.name}</h3>
        <p className="userEmail">{user.email}</p>
        <span className={`userRoleTag ${user.role === 'admin' ? 'roleAdmin' : 'roleCustomer'}`}>
          {translateRole(user.role)}
        </span>
      </div>
      <div className="userCardActions">
        <button
          type="button"
          className="userCardBtn btnView"
          onClick={() => onView(user)}
          title={`Ver detalles de ${user.name}`}
          aria-label={`Ver detalles de ${user.name}`}
        >
          Ver
        </button>
        <button
          type="button"
          className="userCardBtn btnEdit"
          onClick={() => onEdit(user)}
          title={`Editar usuario ${user.name}`}
          aria-label={`Editar usuario ${user.name}`}
        >
          Editar
        </button>
        <button
          type="button"
          className="userCardBtn btnDelete"
          onClick={() => onDelete(user)}
          title={`Eliminar usuario ${user.name}`}
          aria-label={`Eliminar usuario ${user.name}`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default UserCard;
