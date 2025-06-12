// frontend/src/components/Header.tsx

import { FC } from "react";
import { PersonCircle } from "react-bootstrap-icons";

interface HeaderProps {
  onLogout?: () => void;
}

const Header: FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header flex-between">
      <div className="logo">Playtest Tracker</div>
      <div className="actions">
        <PersonCircle size={24} />
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
