const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div>
          <h1>MERN JWT AUTHENTICATION</h1>
          <div
            className="d-flex justify-content-center mt-4"
            style={{ gap: "1.5rem" }}
          >
            <a href="/login" className="btn btn-primary">
              Sign In
            </a>
            <a href="/register" className="btn btn-secondary">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
