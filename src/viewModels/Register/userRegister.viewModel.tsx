import { useState } from "react";

export const useRegisterViewModel = () => {
  const [userData, setUserData] = useState({ name: "Ahkroma" });

  return { userData, setUserData };
};
