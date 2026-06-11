type EmptyStateProps = {
  title: string;
  description?: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="col-span-full flex min-h-64 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
      <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
