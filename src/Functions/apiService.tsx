import axios from "axios";

export const url = "http://localhost:5046";

export const callAuthApiEndpoint = async (id_token: string) => {
  try {
    const response = await axios.get(url + "/authOnly", {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    console.log("Response from AuthAPI: ", response.data);
  } catch {
    console.log("Error");
  }
};
