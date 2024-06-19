import bgLogin from "../../assets/background-login.svg";

const Background = ({ children }) => {
  return (
    <>
      <main
        className="min-h-screen flex flex-col items-center justify-center bg-[image:var(--bg-image)] bg-cover bg-center relative font-mulish shadow-inset p-20"
        style={{ "--bg-image": `url(${bgLogin})` }}
      >
        {children}
      </main>
    </>
  );
};

export default Background;
