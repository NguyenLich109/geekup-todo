import Header from "../component/header/header";
import "./index.scss";

export default function Home() {
  return (
    <>
      <div className="app-home">
        <Header />
        <div className="app-home_container"></div>
      </div>
    </>
  );
}
