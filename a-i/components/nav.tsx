export default () => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand js-scroll-trigger" href="#page-top">Aggregate Intellect</a>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button" data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger"
              href="https://tdls.a-i.science/">TDLS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger"
              href="https://blog.a-i.science/">Blog</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger"
              href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">YouTube</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

)