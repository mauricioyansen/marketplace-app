import { Redirect } from "expo-router";

export default function App() {
  // const userData = {
  //   token: "123",
  //   name: "John Doe",
  // };

  const userData = null; // Simulating no user data

  if (userData) return <Redirect href="/(private)/home" />;

  return <Redirect href="/login" />;
}
