import Link from 'next/link';

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
        <Link href="/code-of-conduct">
          <a>Code of Conduct</a>
        </Link>
      </div>
    </div>
  </footer>
);
