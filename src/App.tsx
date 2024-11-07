import { useEffect, useState } from "react";
import { Customer } from "./Data/Customer";
import axios from "axios";

function App() {
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user...");
      const response = await axios.get(`/api/Customer/getAll`);
      setUser(response.data[0]);
    };
    fetchUser();
  }, []);

  return (
    <>
      <p>Hello World!</p>
      {user && <p>{user.surname}</p>}
    </>
  );
}

export default App;
