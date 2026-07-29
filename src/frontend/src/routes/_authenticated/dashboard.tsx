import { createFileRoute } from "@tanstack/react-router";

import data from "../../lib/api/data.json";
import { SectionCards } from "#/features/dashboard/section-cards";
import { DataTable } from "#/features/dashboard/data-table";
import { ChartAreaInteractive } from "#/features/dashboard/chart-area-interactive";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
