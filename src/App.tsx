import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initData: string;
        initDataUnsafe?: {
          user?: {
            id?: number;
            first_name?: string;
            username?: string;
          };
        };
      };
    };
  }
}

export default function App() {
  const [message, setMessage] = useState("Yükleniyor...");
  const [userInfo, setUserInfo] = useState("Telegram içinde açılmadı");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      setMessage("Şu an normal tarayıcıdasın...");
      return;
    }

    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    setMessage("Telegram bağlı");
    setUserInfo(
      user
        ? `ID: ${user.id} | Ad: ${user.first_name ?? "-"} | Username: ${user.username ?? "-"}`
        : "Kullanıcı bilgisi yok"
    );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        fontFamily: "Arial",
      }}
    >
      <h1>ADN Mini App</h1>
      <p>{message}</p>
      <p>{userInfo}</p>
    </div>
  );
}