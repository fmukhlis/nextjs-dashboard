import { Check, Clock } from "lucide-react";
import clsx from "clsx";

export default function InvoiceStatus({
  status,
}: {
  status: "pending" | "paid";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "paid",
        },
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <Clock className="ml-1 w-4 text-gray-500" />
        </>
      ) : (
        <>
          Paid
          <Check className="ml-1 w-4 text-white" />
        </>
      )}
    </span>
  );
}
