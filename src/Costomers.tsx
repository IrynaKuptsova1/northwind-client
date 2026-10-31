import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import ContactAvatar from "./Avatar";
import type { Customers} from "./types";

function CustomersPage() {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");

export default CustomersPage;