import { useRef } from "react";
import { IUserApp } from "../../interfaces/IUserApp";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

interface Props {
  users: IUserApp[];
}

export const TableUser = ({ users }: Props) => {
  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Button onClick={handlePrint} type="primary" size="large" danger>
        <FilePdfOutlined /> Export to PDF{" "}
      </Button>
      <div style={{ display: "none", fontSize: "20px", marginLeft: 20 }}>
        <table ref={componentRef} style={{ backgroundColor: "white" }}>
          <thead style={{ border: "1px solid black" }}>
            <tr>
              <th style={{ width: 200, fontWeight: "bold" }}>Nombres</th>
              <th style={{ width: 200, fontWeight: "bold" }}>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr style={{ border: "1px solid black" }} key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
