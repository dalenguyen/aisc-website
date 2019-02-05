export default () => (
  <footer className="footer">
    <style jsx>{`
      a {
        color: white;
        margin-left: 10px;
      }
    `}</style>
    <div
      className="floater navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: '#5a5a5a',
        height: '2.5rem',
        marginTop: '5rem',
      }}
    >
      <div className="pull-left copyright" style={{ marginTop: '.6rem' }}>
        &copy; 2018-2019 Aggregate Intellect Inc.
        <a href="/code-of-conduct">Code of Conduct</a>
      </div>
    </div>
  </footer>
);
