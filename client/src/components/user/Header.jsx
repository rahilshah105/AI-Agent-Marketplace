import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/clerk-react";          // ✧ add Clerk hooks
import styles from "./Header.module.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();        // ✧ get modals

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* ─────────── Left group ─────────── */}
        <div className={styles.leftGroup}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>A</span>
            <span className={styles.logoText}>AgentMarket</span>
          </Link>

          {/* Nav now lives inside the left-hand group */}
          <nav className={styles.linksDesktop}>
            <Link to="/creator" className={styles.link}>Creator&nbsp;Dashboard</Link>
            <span className={styles.divider}>|</span>
            <Link to="/my-agents" className={styles.link}>My&nbsp;Agents</Link>
          </nav>
        </div>

        {/* ─────────── Right side (search + auth) ─────────── */}
        <div className={styles.actionsDesktop}>
          <div className={styles.search}>
            <Search className={styles.searchIcon} size={18} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search agents…"
            />
          </div>

          {/* open Clerk modals on click */}
          <Button
            size="sm"
            variant="secondary"
            className={styles.authBtn}
            onClick={() => openSignUp()}
          >
            Sign Up
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={styles.authBtn}
            onClick={() => openSignIn()}
          >
            Sign In
          </Button>
        </div>

        {/* ─────────── Mobile toggle ─────────── */}
        <button
          className={styles.menuBtn}
          onClick={() => setMobileMenuOpen((p) => !p)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─────────── Mobile drawer ─────────── */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileSearch}>
            <Search className={styles.searchIcon} size={18} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search agents…"
            />
          </div>

          <nav className={styles.linksMobile}>
            <Link to="/creator" className={styles.linkMobile} onClick={() => setMobileMenuOpen(false)}>
              Creator Dashboard
            </Link>
            <Link to="/my-agents" className={styles.linkMobile} onClick={() => setMobileMenuOpen(false)}>
              My Agents
            </Link>
          </nav>

          <div className={styles.mobileAuth}>
            <Button
              variant="secondary"
              className={styles.mobileAuthBtn}
              onClick={() => { openSignUp(); setMobileMenuOpen(false); }}
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              className={styles.mobileAuthBtn}
              onClick={() => { openSignIn(); setMobileMenuOpen(false); }}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
