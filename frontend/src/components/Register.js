import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({email, password});
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1 className="auth__title">Регистрация</h1>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleSetEmail}
          placeholder="Email"/>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleSetPassword}
          placeholder="Пароль"
        />
        <button
          className="auth__submit"
          aria-label="Войти"
          type="submit"
        >Зарегистрироваться</button>
        <p className="auth__hint">Уже зарегистрированы?
          <Link className="auth__hint_link" to="/sign-in"> Войти</Link>
        </p>
      </form>
    </div>
  )
}

export default Register;
