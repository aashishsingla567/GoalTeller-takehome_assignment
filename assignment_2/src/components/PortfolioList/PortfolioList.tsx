import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useMemo } from "react";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import { MutualFund, Portfolio } from "../../types";

interface MutualFundsDataGridProps {
  onMutualFundClick: (
    mutualFund: MutualFund,
    changeFundUnits: Function
  ) => void;
}

function MutualFundsDataGrid({ onMutualFundClick }: MutualFundsDataGridProps) {
  const { allFunds, unitsOwned, changeFundUnits } =
    useContext(PortfolioContext);

  const columns: GridColDef[] = [
    {
      field: "schemeName",
      headerName: "Funds",
      flex: 2.5,
      renderCell: (params) => {
        const fund = params.row as MutualFund;
        console.log({ fund });
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              onMutualFundClick(
                fund,
                changeFundUnits(
                  params.api.getRowIndexRelativeToVisibleRows(params.row.id)
                )
              )
            }
          >
            {fund.schemeName || "Name not found"}
          </div>
        );
      },
    },
    {
      field: "unitsOwned",
      headerName: "Units Owned",
      type: "number",
      flex: 1,
    },
  ];

  const rows = useMemo(
    () =>
      allFunds?.map((fund, index) => {
        return {
          id: index,
          ...fund,
          unitsOwned: unitsOwned[index],
        };
      }),
    [allFunds, unitsOwned]
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid columns={columns} rows={rows || []} />
    </div>
  );
}

export default MutualFundsDataGrid;
