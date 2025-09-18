"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export type UserDetail = {
  name: string;
  email: string;
  credits: number;
};

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // whenever the user is there then only execute it
  useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await axios.post("/api/users");
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("User creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;
