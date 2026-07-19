function AppButton({ label, theme, icon, onPress }) {
  const className =
    theme === 'primary' ? 'app-button app-button--primary' : 'app-button';

  return (
    <button type="button" className={className} onClick={onPress}>
      {icon && <span className="app-button-icon" aria-hidden>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default AppButton;
