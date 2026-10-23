export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Northwind Traders</h1>
        <div className="description">
          <h2>Running on Cloudflare's D1</h2>
          <img
            src="https://imagedelivery.net/4wj01aQOZZ0hemsvbxWAvA/763bcbcd-6da6-46ec-f5e1-70c1c1a33d00/public"
            alt="Northwind Traders Database"
          />

          <p>
            This is a demo of the Northwind dataset, running on{" "}
            <a
              href="https://workers.cloudflare.com/"
              target="_blank"
              rel="noreferrer"
            >
              Cloudflare Workers
            </a>
            , and D1 - Cloudflare's newest SQL database, running on SQLite.
          </p>

          <p>
            Read our{" "}
            <a
              href="https://blog.cloudflare.com/d1-turning-it-up-to-11/"
              target="_blank"
              rel="noreferrer"
            >
              most recent D1 announcement
            </a>{" "}
            to learn more about D1.
          </p>

          <p>
            This dataset was sourced from{" "}
            <a
              href="https://github.com/jpwhite3/northwind-SQLite3"
              target="_blank"
              rel="noreferrer"
            >
              northwind-SQLite3
            </a>
            .
          </p>

          <p>
            You can use the UI to explore Supplies, Orders, Customers, Employees
            and Products, or you can use search if you know what you're looking
            for.
          </p>
        </div>
      </div>
    </div>
  );
}
