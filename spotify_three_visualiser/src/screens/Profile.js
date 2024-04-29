import axios from "axios";
import { useState, useEffect } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const token = window.localStorage.getItem("key");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userUrl: data.external_urls.spotify,
          name: data.display_name,
        };
        setUserInfo(userInfo);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>User ID: {userInfo.userId}</p>
      <p>User URL: <a href={userInfo.userUrl}>{userInfo.userUrl}</a></p>
      <p>Name: {userInfo.name}</p>
    </div>
  );
}
