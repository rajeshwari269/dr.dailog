import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import ViewReport from "./view-report";

type Props = {
  historyList: SessionDetail[];
};

const HistoryTable = ({ historyList }: Props) => {
  return (
    <div className="bg-[#0d0d0d] p-6 rounded-2xl shadow-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4">
        Consultation History
      </h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-800">
          <TableCaption className="text-gray-500 italic mt-4">
            Your previous consultations
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-gray-800 bg-gray-900/40">
              <TableHead className="w-[180px] text-gray-300 font-medium">
                AI Medical Specialist
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                Description
              </TableHead>
              <TableHead className="text-gray-300 font-medium">Date</TableHead>
              <TableHead className="text-right text-gray-300 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyList.map((history: SessionDetail, index: number) => (
              <TableRow
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors"
              >
                <TableCell className="font-medium text-gray-100">
                  {history?.selectedDoctor?.specialist}
                </TableCell>
                <TableCell className="text-gray-300">
                  {history?.symptoms || "—"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {moment(new Date(history?.createdOn)).fromNow()}
                </TableCell>
                <TableCell className="text-right">
                  <ViewReport history={history} />
                </TableCell>
              </TableRow>
            ))}
            {historyList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No consultations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HistoryTable;
