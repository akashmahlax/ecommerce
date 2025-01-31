export const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    { Header: "Price (₹)", accessor: "price" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Category", accessor: "category" },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="space-x-2">
          <button className="text-blue-600">Edit</button>
          <button className="text-red-600">Delete</button>
        </div>
      ),
    },
  ];
  