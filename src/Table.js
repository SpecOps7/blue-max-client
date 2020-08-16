import React from "react";
import "./Table.css";


function Table({ battleList }) {
  return (
    <div className="table">
          {Object.entries(battleList).map(([key, value]) =>
          <tr>
    
          <td>
            <strong>{value}</strong>
          </td>
          <td>
            <strong>{key}</strong>
          </td>
        </tr>
              

              )}

    </div>
  );
}

export default Table;
