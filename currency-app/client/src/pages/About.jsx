import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About";
  },[]);

  return (
    <section className="container-about">
      <div className="box">
        <div className="title-about">
          <h3>About Us</h3>
        </div>
        <div className="content">
          Welcome to <span>WebWarriors.</span>, the smart currency web that
          helps you manage your finances and plan your financial future. We are
          committed to providing an easy, fast, and secure experience in in
          converting currencies as well as managing your savings.
        </div>
      </div>
    </section>
  );
}
