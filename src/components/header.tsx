import cls from './header.module.css';

const Header = () => {
  return (
    <header className={cls.header}>
      <h1>NextDash</h1>
      <div>Администратор</div>
    </header>
  );
};

export default Header;
