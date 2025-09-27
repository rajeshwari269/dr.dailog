import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  history: SessionDetail;
};

const ViewReport = ({ history }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="link"
          className="border border-green-500 text-green-600 font-medium cursor-pointer transition rounded-xl px-4 py-1 hover:bg-green-50 hover:text-green-700"
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 max-w-2xl border border-green-200">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-3xl font-bold text-green-600 mb-2 tracking-wide">
              🩺 Medical AI Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-6 space-y-8">
              {/* Session Info */}
              <section className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                <h3 className="text-green-700 text-lg font-semibold mb-3">
                  Session Info
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <span className="font-semibold">Doctor: </span>
                      {history?.selectedDoctor?.specialist || "General Physician"}
                    </p>
                    <p>
                      <span className="font-semibold">Consultation Date: </span>
                      {moment(new Date(history?.createdOn)).fromNow()}
                    </p>
                  </div>
                  <div>
    
                    <p>
                      <span className="font-semibold">Agent: </span>
                      {history?.report?.agent || "Medical AI"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Chief Complaint */}
              <section className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                <h3 className="text-green-700 text-lg font-semibold mb-3">
                  Chief Complaint
                </h3>
                <p className="text-sm leading-relaxed">
                  {history?.report?.chiefComplaint ||
                    "No chief complaint reported."}
                </p>
              </section>

              {/* Summary */}
              <section className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                <h3 className="text-green-700 text-lg font-semibold mb-3">
                  Summary
                </h3>
                <p className="text-sm leading-relaxed">
                  {history?.report?.summary || "No summary available."}
                </p>
              </section>

              {/* Symptoms & Recommendations */}
              <section className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                  <h4 className="text-green-600 text-md font-semibold mb-3">
                    Symptoms
                  </h4>
                  <div className="text-sm">
                    {history?.report?.symptoms?.length > 0 ? (
                      <ul className="list-disc ml-4 space-y-1">
                        {history.report.symptoms.map(
                          (symptom: string, idx: number) => (
                            <li key={idx}>{symptom}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                  <h4 className="text-green-600 text-md font-semibold mb-3">
                    Recommendations
                  </h4>
                  <div className="text-sm">
                    {history?.report?.recommendations?.length > 0 ? (
                      <ul className="list-disc ml-4 space-y-1">
                        {history.report.recommendations.map(
                          (rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      "No recommendations listed"
                    )}
                  </div>
                </div>
              </section>

              {/* Duration & Severity */}
              <section className="bg-green-50 rounded-xl px-5 py-4 shadow-sm border border-green-100">
                <h3 className="text-green-700 text-lg font-semibold mb-3">
                  Duration & Severity
                </h3>
                <div className="flex gap-8 text-sm">
                  <p>
                    <span className="font-semibold">Duration: </span>
                    {history?.report?.duration || "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold">Severity: </span>
                    {history?.report?.severity || "Not specified"}
                  </p>
                </div>
              </section>

              {/* Footer */}
              <footer className="text-center pt-4 border-t border-green-200">
                <p className="text-xs italic text-gray-500">
                  🤖 AI-generated report by{" "}
                  <span className="text-green-600 font-semibold">
                    Dr. Dialog
                  </span>
                </p>
              </footer>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReport;
