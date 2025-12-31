import StepTargetSetter from "@/components/StepTargetSetter";

export default function StepTargetPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">
        Set Daily Step Goal
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        Adjust daily walking target for the selected band.
      </p>

      <div className="max-w-md">
        <StepTargetSetter />
      </div>
    </div>
  );
}
