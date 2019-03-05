import Link from 'next/link';
import getConfig from 'next/config'
const { SITE_ABBREV } = getConfig().publicRuntimeConfig;

export default () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* <!-- Sidebar - Brand --> */}
      <Link href="/">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">{SITE_ABBREV} Members</div>
        </a>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link" >
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Member Home</span></a>
        </Link>
      </li>
      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      <li className="nav-item">
        <Link href="/event-manager">
          <a className="nav-link" >
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Event Manager</span></a>
        </Link>
      </li>

    </ul>
  );
}