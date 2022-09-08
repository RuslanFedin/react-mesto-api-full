import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
   if (onLogin && email && password){
    onLogin({email, password});
    resetForm();
   }
  }

  return (
    <div className="auth" onSubmit={handleSubmit}>
      <form className="auth__form">
        <h1 className="auth__title">Вход</h1>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleSetEmail}
          placeholder="Email"/>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleSetPassword}
          placeholder="Пароль"
        />
        <button
          className="auth__submit"
          aria-label="Войти"
          type="submit"
        >Войти</button>
      </form>
    </div>
  )
}

export default Login;
