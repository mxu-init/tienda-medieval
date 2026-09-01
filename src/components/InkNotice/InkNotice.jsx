
import './InkNotice.css';

const ROLE_BY_TONE = {
  info: 'status',
  error: 'alert',
  success: 'status',
};

const InkNotice = ({ tone = 'info', title, children }) => {
  if (!title && !children) {
    return null;
  }

  return (
    <div
      className={`inkNotice inkNotice${tone.charAt(0).toUpperCase()}${tone.slice(1)}`}
      role={ROLE_BY_TONE[tone] ?? 'status'}
    >
      {title && <p className="inkNoticeTitle">{title}</p>}
      {children && <p>{children}</p>}
    </div>
  );
};

export default InkNotice;
