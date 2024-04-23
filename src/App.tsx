import { useRef, useState, useEffect } from 'react';

interface IUserProps {
  login: string;
  avatar_url: string;
}

function App() {
  const userRef = useRef<null | HTMLInputElement>(null);
  const [user, setUser] = useState<IUserProps>({
    login: '',
    avatar_url: '',
  });

  const fetchUser = async () => {
    const response = await fetch(`https://api.github.com/users/github`);
    const data = await response.json();
    setUser(data);
  }; // funcao assincrona para req do API github

  useEffect(() => {
    fetchUser();
  }, []); // **vazio** para que o useEffect seja executado apenas uma vez.

  const onClick = async () => {
    const value = userRef.current?.value as string;
    const response = await fetch(`https://api.github.com/users/${value}`);
    const data = await response.json();
    setUser(data);
  };

  return (
    <>
      <input placeholder="user" ref={userRef} />
      <button onClick={onClick}>Buscar</button>
      <div>
          <img src={user.avatar_url} alt="Avatar" />
      </div>
    </>
  );
}

export default App;
