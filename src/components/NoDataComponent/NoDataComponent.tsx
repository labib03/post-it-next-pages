type Props = {
  type: string;
};

export default function NoDataComponent({ type }: Props) {
  return (
    <div className="bg-champagne-100 py-3 rounded-lg">
      <h2 className="text-center tracking-wide">
        No {type.toLowerCase()} yet.
      </h2>
    </div>
  );
}
