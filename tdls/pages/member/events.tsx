import { Fragment } from "react";
import Head from 'next/head'
import './scss/sb-admin-2.scss';

export default () => {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />

        <title>TDLS Members</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet" />
      </Head>

      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
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
          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Member Home</span></a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />
        </ul>

        {/* <!-- End of Sidebar --> */}
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>

              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Me</span>
                    <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                  </a>
                  {/* <!-- Dropdown - User Information --> */}
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>

            </nav>
            {/* <!-- End of Topbar --> */}
            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Content Row --> */}
              <div className="row">
                {/* <!-- Area Chart --> */}
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">Events</h6>

                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                      <div className="chart-area">
                        sadsa
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Aggregate Intellect, Inc 2019</span>
              </div>
            </div>
          </footer>

        </div>

      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* <!-- Logout Modal--> */}
      <div className="modal fade" id="logoutModal"
        tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}