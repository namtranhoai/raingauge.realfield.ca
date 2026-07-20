function AppButton({ label, sublabel, theme, icon, onPress }) {
  const className =
    theme === 'primary' ? 'app-button app-button--primary' : 'app-button';

  return (
    <button type="button" className={className} onClick={onPress}>
      {icon && <span className="app-button-icon" aria-hidden>{icon}</span>}
      <span className="app-button-text">
        <span>{label}</span>
        {sublabel && <span className="app-button-sublabel">{sublabel}</span>}
      </span>
    </button>
  );
}

export default AppButton;
