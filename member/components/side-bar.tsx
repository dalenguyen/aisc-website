import Link from 'next/link';

export default () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* <!-- Sidebar - Brand --> */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">TDLS Members</div>
      </a>

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