const Arrow = ({ arrow, activeArrow }) => {
  return (
    <div
      className={`w-[69px] h-[69px] bg-[image:var(--arrow)] active:bg-[image:var(--active-arrow)] bg-cover bg-center bg-no-repeat transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
      style={{
        "--arrow": `url(${arrow})`,
        "--active-arrow": `url(${activeArrow})`,
      }}
    ></div>
  );
};

export default Arrow;
